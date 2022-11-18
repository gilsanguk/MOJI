from django.http import JsonResponse, HttpResponse
import requests
from .models import Genre, Movie, Actor, Director


# import torch
# from transformers import AutoTokenizer, AutoModelForSequenceClassification
# import numpy as np
# import base64

# tokenizer = AutoTokenizer.from_pretrained("Tejas3/distillbert_110_uncased_movie_genre")
# model = AutoModelForSequenceClassification.from_pretrained("Tejas3/distillbert_110_uncased_movie_genre").cuda().eval()

# def getvector(movie_dict, page):
#     overview = requests.get(
#         f'https://api.themoviedb.org/3/movie/{movie_dict.get("id")}',
#         params={
#             'api_key': API_KEY,
#             'language': 'en-US',     
#             'page': page,       
#         }
#         ).json().get('overview')
#     if not overview: return 0
#     inputs = tokenizer.batch_encode_plus([overview])
#     input_ids = torch.tensor(inputs['input_ids']).cuda()
#     with torch.no_grad():
#         out = model(input_ids = input_ids, output_hidden_states=True)

#     output_cpu = out.hidden_states[-1][:,0,:].cpu().numpy()
#     vector_bytes = output_cpu.tobytes()
#     vector_str = base64.b64encode(vector_bytes).decode('ascii') 
#     return vector_str


API_KEY = 'b44d068c0598769b439da2b0cc74f085'
GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list'
POPULAR_MOVIE_URL = 'https://api.themoviedb.org/3/movie/popular'

def tmdb_genres():
    response = requests.get(
        GENRE_URL,
        params={
            'api_key': API_KEY,
            'language': 'ko-KR',        
        }
    ).json()    
    for genre in response.get('genres'):
        if Genre.objects.filter(pk=genre['id']).exists(): continue        
        Genre.objects.create(
            id=genre['id'],
            name=genre['name']
        )
    return JsonResponse(response)

def get_youtube_key(movie_dict):    
    movie_id = movie_dict.get('id')
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie_id}/videos',
        params={
            'api_key': API_KEY
        }
    ).json()
    for video in response.get('results'):
        if video.get('site') == 'YouTube':
            return video.get('key')
    return 'nothing'

def get_actors(movie):
    movie_id = movie.id
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie_id}/credits',
        params={
            'api_key': API_KEY,
            'language': 'ko-kr',
        }
    ).json()
    
    for person in response.get('cast'):
        if person.get('known_for_department') != 'Acting': continue
        actor_id = person.get('id')
        if not Actor.objects.filter(pk=actor_id).exists():
            actor = Actor.objects.create(
                id=person.get('id'),
                name=person.get('name')
            )
        movie.actors.add(actor_id)
        if movie.actors.count() == 5:       # 5명의 배우 정보만 저장
            break

def get_directors(movie):
    movie_id = movie.id
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie_id}/credits',
        params={
            'api_key': API_KEY,
            'language': 'ko-kr',
        }
    ).json()
    
    for person in response.get('crew'):
        if person.get('job') != 'Director': continue
        director_id = person.get('id')
        if not Director.objects.filter(pk=director_id).exists():
            director = Director.objects.create(
                id=person.get('id'),
                name=person.get('name')
            )
        movie.directors.add(director_id)
        break


def movie_data(page):
    response = requests.get(
        POPULAR_MOVIE_URL,
        params={
            'api_key': API_KEY,
            'language': 'ko-kr',     
            'page': page,       
        }
    ).json()

    for movie_dict in response.get('results'):
        if not movie_dict.get('release_date'): continue   # 없는 필드 skip
        try:
            # vector = getvector(movie_dict, page)
            # if not vector: continue
            youtube_key = get_youtube_key(movie_dict)

            if movie_dict.get('poster_path'):
                poster_path = f'https://image.tmdb.org/t/p/original{movie_dict.get("poster_path")}'
            else:
                poster_path = 'https://www.movienewz.com/img/films/poster-holder.jpg'
            movie = Movie.objects.create(
                id=movie_dict.get('id'),
                title=movie_dict.get('title'),
                release_date=movie_dict.get('release_date'),
                popularity=movie_dict.get('popularity'),
                vote_count=movie_dict.get('vote_count'),
                vote_average=movie_dict.get('vote_average'),
                overview=movie_dict.get('overview'),
                poster_path=poster_path,
                youtube_key=youtube_key,
                vector = vector,
            )
            for genre_id in movie_dict.get('genre_ids', []):
                movie.genres.add(genre_id)

            # 배우들 저장
            get_actors(movie)
            # 감독들 저장
            get_directors(movie)
        except: continue


def tmdb_data(request):
    tmdb_genres()
    for i in range(1, 501):
        movie_data(i)
        print('page : ', i)
    return HttpResponse('OK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')