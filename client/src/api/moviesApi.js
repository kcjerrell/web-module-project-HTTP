import axios from "axios";
import { createContext } from "react";

export const useApi = (movies, setMovies) => {

	const deleteMovie = (id) => {
		return axios.delete(`http://localhost:5000/api/movies/${id}`)
			.then(res => {
				fetchAll();
				return (res.data);
			})
			.catch(error => console.log(error));
	};

	const editMovie = (movie) => {
		// this axios call returns back ALL the movies
		return axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
			.then(res => {
				setMovies(res.data);
				return res.data;
			})
			.catch(error => console.log(error));
	};

	const addMovie = (movie) => {
		return axios.post(`http://localhost:5000/api/movies`, movie)
			.then(res => {
				setMovies(res.data);
				return res.data;
			})
			.catch(error => console.log(error));
	};

	const updateMoviesState = (newOrChanged) => {
		const updatedMovies = movies.filter(m => m.id != newOrChanged.id);
		setMovies([...updatedMovies, newOrChanged]);
	};

	const getMovie = (id) => {
		return axios.get(`http://localhost:5000/api/movies/${id}`)
			.then(res => {
				updateMoviesState(res.data);
				return res.data;
			})
			.catch(error => console.log(error));
	};

	const fetchAll = () => {
		return axios.get('http://localhost:5000/api/movies')
			.then(res => {
				setMovies(res.data);
				return res.data;
			})
			.catch(err => {
				console.log(err);
			});
	};

	if (!movies || movies.length === 0) {
		fetchAll();
	};

	return { movies, addMovie, editMovie, deleteMovie, getMovie, fetchAll };
}

export const MoviesContext = createContext();
