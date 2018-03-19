//lucian
import React from 'react';

const Article = (props) => (
    <div className="c-article">
        <h1 className="c-article__titlebox">{props.article.title}</h1>
        <div className="c-article__titlebox-details">
            <span className="c-article__item c-article-titlebox__date u-block">
                <span className="c-article__item-title">
                    Date:
                </span>
                <span className="c-article__item-value">
                    { props.article.created}
                </span>
            </span>
            {
                props.article.params && props.article.params.map((item, index) => {

                    return (
                        <span className={(index !== 0) ? "c-article__item c-article__item--separate" : "c-article__item" } key={index}>
                            <span className="c-article__item-title">
                                {item[0]}:
                            </span>
                            <span className="c-article__item-value">
                                {item.slice(-1).pop()}
                            </span>
                        </span>
                    )
                })
            }
        </div>
        <div className="c-article__content">
            <p className="c-article__description">
                {props.article.description}
            </p>
        </div>
    </div>
);

export default Article;
