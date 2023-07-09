import { useEffect } from "react";
import { useAppDispatch } from "../../store/app/hooks";
import { getToken } from "../../utils/token";
import { setAuth } from "../../store/features/auth";
import axios from "axios";

interface Props {
	is_form_data?: boolean;
}
function useAxios({ is_form_data }: Props = { is_form_data: true }) {
	const dispatch = useAppDispatch();
	const axiosInstance = axios.create({
		baseURL: "https://sesa-digital.herokuapp.com/api",
		// baseURL: 'https://sesadigital.com/api'
	});

	useEffect(() => {
		axiosInstance.interceptors.request.use(
			(config) => {
				const token = getToken();
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
					if (is_form_data) {
						config.headers["Content-Type"] = "multipart/form-data";
					} else {
						config.headers["Content-Type"] = "application/json";
					}
				} else {
					dispatch(
						setAuth({
							isAuth: false,
							role: "",
						}),
					);
				}
				return config;
			},
			(error) => Promise.reject(error),
		);

		axiosInstance.interceptors.response.use(
			(response) => response.data,
			(error) => Promise.reject(error),
		);
	}, [dispatch, axiosInstance]);

	return axiosInstance;
}

export default useAxios;
