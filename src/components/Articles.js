//lucian
import React from 'react';
import Article from './Article';

const Articles = (props) => (
    <div className={props.rootClass}>
        {props.articles.length === 0 && <p className="">Please add an article to get started!</p>}
        {
            props.articles.map((article, index) =>{
                console.log(article);
                return (
                        <Article
                            key={article.id}
                            article={article}
                            count={index + 1}
                        />
                )
            })
        }
    </div>
);

export default Articles;


