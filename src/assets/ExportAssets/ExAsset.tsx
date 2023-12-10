
export let Selected = {
    "adult": false,
    "backdrop_path": "/rMvPXy8PUjj1o8o1pzgQbdNCsvj.jpg",
    "genre_ids": [
        28,
        12,
        53
    ],
    "id": 299054,
    "original_language": "en",
    "original_title": "Expend4bles",
    "overview": "Armed with every weapon they can get their hands on and the skills to use them, The Expendables are the world’s last line of defense and the team that gets called when all other options are off the table. But new team members with new styles and tactics are going to give “new blood” a whole new meaning.",
    "popularity": 554.537,
    "poster_path": "/iwsMu0ehRPbtaSxqiaUDQB9qMWT.jpg",
    "release_date": "2023-09-15",
    "title": "Expend4bles",
    "video": false,
    "vote_average": 6.4,
    "vote_count": 866
}


export function pushToSelected(movie:any) {
    Selected = movie
    console.log(Selected)
}