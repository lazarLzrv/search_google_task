import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchBarContext } from "../../contexts/SearchBarContext";

// import useJson from "../../api/useJson";

import Input from "../Input";
import SugestionsList from "../SugestionsList";

import search from "../../assets/icons/search.svg";
import mic from "../../assets/icons/mic.svg";
import photo from "../../assets/icons/photo.svg";

import styles from "./styles.module.scss";

const SearchBar = () => {
    const ref = useRef(null);
    const navigate = useNavigate();

    const { getResultsList } = useJson();

    const { state, dispatch } = useSearchBarContext();
    const { inputValue } = state;

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            dispatch({ type: "SET_IS_OPEN", payload: false });
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        getResultsList(inputValue).then((res) => {
            dispatch({ type: "SET_IS_OPEN", payload: false });
            dispatch({ type: "SET_RESULTS", payload: res });

            navigate(`/search?q=${inputValue.replace(/ /g, "+")}`);
        });
    };

    return (
        <div className={styles.wrapper} ref={ref}>
            <form className={styles.search_bar} onSubmit={onSubmit}>
                <div className={styles.inner}>
                    <img className={styles.search_icon} src={search} alt='' />
                    <Input />

                    <div className={styles.additional_icons}>
                        <img src={mic} alt='mic' />
                        <img src={photo} alt='photo' />
                    </div>
                </div>

                <SugestionsList />
            </form>
        </div>
    );
};

export default SearchBar;
