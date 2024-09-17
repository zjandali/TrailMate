# trailmate-ml/model.py
import pandas as pd
from sklearn.neighbors import NearestNeighbors

# Load data
trails = pd.read_csv('trails.csv')  # Trail features
ratings = pd.read_csv('ratings.csv')  # User ratings

# Merge datasets
data = pd.merge(trails, ratings, on='trail_id')

# Pivot table for collaborative filtering
user_trail_matrix = data.pivot_table(index='user_id', columns='trail_id', values='rating').fillna(0)

# Build the model
model = NearestNeighbors(metric='cosine', algorithm='brute')
model.fit(user_trail_matrix.values)

def get_recommendations(user_id, num_recommendations=5):
    user_index = user_trail_matrix.index.tolist().index(user_id)
    distances, indices = model.kneighbors(user_trail_matrix.iloc[user_index, :].values.reshape(1, -1), n_neighbors=num_recommendations+1)
    recommendations = []
    for i in range(1, len(distances.flatten())):
        idx = indices.flatten()[i]
        recommended_user_id = user_trail_matrix.index[idx]
        recommended_trails = ratings[ratings['user_id'] == recommended_user_id]['trail_id'].tolist()
        recommendations.extend(recommended_trails)
    # Remove already rated trails
    user_trails = ratings[ratings['user_id'] == user_id]['trail_id'].tolist()
    recommendations = list(set(recommendations) - set(user_trails))
    return recommendations[:num_recommendations]
