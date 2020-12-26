import React  from 'react';
import './App.scss';
import { Search } from './components/Search/Search';
import { SearchResult } from './components/SearchResult/SearchResult';
import { useRecoilValue } from 'recoil';
import { isGroupedState } from './recoil/atoms';
import { SearchResultGrouped } from './components/SearchResultGrouped/SearchResultGrouped';

export default function App() {
    const isGrouped = useRecoilValue(isGroupedState);
    return (
        <div className="m-3 app">
            <Search className="d-flex justify-content-center"/>
            {!isGrouped && <SearchResult className="d-flex justify-content-center w-100 mt-3"/>}
            {isGrouped && <SearchResultGrouped className="w-100 mt-3 mw800" />}
        </div>
  );
}
