# import torch
# from transformers import AutoTokenizer, AutoModelForSequenceClassification
# import numpy as np
# import sqlite3
# import faiss
# import base64

# def bert(overview):
#     tokenizer = AutoTokenizer.from_pretrained("Tejas3/distillbert_110_uncased_movie_genre")
#     model = AutoModelForSequenceClassification.from_pretrained("Tejas3/distillbert_110_uncased_movie_genre").cuda().eval()

#     inputs = tokenizer.batch_encode_plus([overview])
#     input_ids = torch.tensor(inputs['input_ids']).cuda()
#     attention_masks = torch.tensor(inputs['attention_mask']).cuda()

#     with torch.no_grad():
#         input_ids = torch.tensor(input_ids).cuda()
#         attention_mask = torch.tensor(attention_masks).cuda()
#         out = model(input_ids = input_ids, attention_mask = attention_mask, output_hidden_states=True)

#     output_cpu = out.hidden_states[-1][:,0,:].cpu().numpy()
#     vector_bytes = output_cpu.tobytes()
#     vector_str = base64.b64encode(vector_bytes).decode('ascii') 

#     # print(vector_str)
#     # index = faiss.IndexFlatL2(768)  
#     # index.add(output_cpu)
#     # k = 2
#     # D, I = index.search(output_cpu, k)
#     # np.argmin(D[:,1])
#     # print(I[11])
#     return vector_str

def bert(overview):
    pass