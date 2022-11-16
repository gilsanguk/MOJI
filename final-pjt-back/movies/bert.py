import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import numpy as np
import sqlite3
import faiss

tokenizer = AutoTokenizer.from_pretrained("Tejas3/distillbert_110_uncased_movie_genre")
model = AutoModelForSequenceClassification.from_pretrained("Tejas3/distillbert_110_uncased_movie_genre").cuda().eval()

con = sqlite3.connect('./db.sqlite3')
cursor = con.cursor()
cursor.execute('SELECT title, overview FROM movies_movieenglish LIMIT 100')
overviews = [d[1] for d in list(cursor) if d[1]]

inputs = tokenizer.batch_encode_plus(overviews)
input_ids = np.zeros((len(overviews), 512), dtype=np.int64)
attention_masks = np.zeros((len(overviews), 512), dtype=np.int64)

for (idx, (input_id, attention_mask)) in enumerate(zip(inputs['input_ids'], inputs['attention_mask'])):
    token_length = len(input_id)
    input_ids[idx][:token_length] = np.array(input_id)
    attention_masks[idx][:token_length] = np.array(attention_mask)

with torch.no_grad():
    input_ids = torch.tensor(input_ids).cuda()
    attention_mask = torch.tensor(attention_masks).cuda()
    out = model(input_ids = input_ids, attention_mask = attention_mask, output_hidden_states=True)

output_cpu = out.hidden_states[-1][:,0,:].cpu().numpy()
print(output_cpu.shape)

index = faiss.IndexFlatL2(768)  
index.add(output_cpu)

k = 2
D, I = index.search(output_cpu, k)
np.argmin(D[:,1])
print(I[11])

print("\n\n\n\n\n\n--------------------------------------------")
print(overviews[11])
print("-----------------------------")
print(overviews[12])
print("--------------------------------------------")