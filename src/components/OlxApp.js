import React from 'react';
import Pagination from 'react-js-pagination';
import Articles from './Articles';

export default class OlxApp extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            activePage: 1,
            articles: [],
            itemsCountPerPage: 10,
            totalItemsCount: 20,
            pageRangeDisplayed: 2
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleArticlesPage = this.handleArticlesPage.bind(this);
        this.textNextButton = 'Next Button';
    }

    handleFetchArticles = () => {
        console.log('fetch data');
        fetch('mock/ads.json')
            .then( (response) => {
                return response.json() })
            .then((articles) => {
                this.setState({json: articles});
            }).then(() => {
            this.handleArticlesPage();
        });
    };

    componentDidMount() {
        console.log('fetching data');
        try {
            this.handleFetchArticles()
        } catch (e) {
            // Do nothing at all
        }
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('update');
        if(prevState.activePage !== this.state.activePage) {
            //console.log(prevState.activePage);
            this.handleArticlesPage();
        }
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    handleArticlesPage() {
        if(!this.state.json) return [];

        const listArticles = this.state.json.filter((article, index) => {
            const isMatch = (parseInt(this.state.activePage) === (index + 1)) ? true : false;

            if(isMatch) {
                this.setState({
                    pageRangeDisplayed: article.total_pages,
                    itemsCountPerPage: article.ads.length
                })
            }
            return isMatch;
        });

        if(listArticles.length > 0) {
            this.setState({
                articles: listArticles[0].ads,
                totalItemsCount: listArticles[0].ads.length * listArticles[0].total_pages
            })
        }
    }
    render() {
        return (
            <div className="c-ads">
                <div className="c-ads__header">
                    <img className="c-ads__image c-ads__image--circle" src="./images/OLX_Logo.jpg" alt="logo Olx"/>
                </div>

                <Articles
                    articles={this.state.articles}
                    rootClass="c-ads__content c-ads__list"
                />

                <div className="c-ads__content c-ads__pagination">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange}
                        itemClass="c-pagination__link-item"
                        linkClass="c-pagination__link"
                        linkClassFirst="c-pagination__link-first"
                        linkClassPrev="c-pagination__link-prev"
                        linkClassNext="c-pagination__link-next"
                        linkClassLast="c-pagination__link-last"
                        activeLinkClass="c-pagination__link-active"
                        activeClass="c-pagination__link-item-active"
                        lastPageText={this.textNextButton}
                    />
                </div>
            </div>
        );
    }
}
