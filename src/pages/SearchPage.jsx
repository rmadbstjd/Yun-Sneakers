import React,{useState,useEffect} from 'react';
import styles from './css/SearchPage.module.css';
import {useQuery} from '@tanstack/react-query';

import useStore from '../store';
import {useSearchParams} from 'react-router-dom';
const SearchPage = () => {
    const {product} = useStore();
    const [query, setQuery] = useSearchParams();
    const searchQuery= query.get('keyword')|| "";
    const {error, isLoading, data:products} = useQuery([searchQuery], () => product.search(searchQuery));
    products && console.log("products",products);
    return (
        <div>
            Search Page
        </div>
    );
};

export default SearchPage;