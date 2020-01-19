import React, { Fragment } from "react";
import PropTypes from "prop-types";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);

        i += step;
    }

    return range;
}

class AppPagination extends React.Component {

    constructor(props) {
        super(props);

        const { totalRecords = null, pageLimit = 5, pageNeighbours = 0} = props;

        this.pageLimit = pageLimit;

        this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

        this.pageNeighbours = typeof pageNeighbours === 'number' ?
            Math.max(Math.min(0, pageNeighbours, 2)) : 0;

        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

        this.state = { currentPageTable: 1 };

    }

    componentDidMount() {
        this.goToPage(1)
    }

    goToPage = page => {
        const { onPageChanged = x => x } = this.props;

        const currentPageTable = Math.max(0, Math.min(page, this.totalPages));

        const paginationData = {
            currentPageTable,
            totalPages: this.totalPages,
            pageLimit: this.pageLimit,
            totalRecords: this.totalRecords
        };

        this.setState({ currentPageTable }, () => onPageChanged(paginationData));
    }

    handleClick = (page, e) => {
        e.preventDefault();
        this.goToPage(page);
    }

    handleMoveLeft = evt => {
        evt.preventDefault();
        this.goToPage(this.state.currentPageTable - this.pageNeighbours * 2 - 1);
    };

    handleMoveRight = evt => {
        evt.preventDefault();
        this.goToPage(this.state.currentPageTable + this.pageNeighbours * 2 + 1);
    };

    fetchPageNumbers = () => {
        const totalPages = this.totalPages;
        const currentPageTable = this.state.currentPageTable;
        const pageNeighbours = this.pageNeighbours;

        const totalNumbers = this.pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            let pages = [];

            const leftBound = currentPageTable - pageNeighbours;
            const rightBound = currentPageTable + pageNeighbours;
            const beforeLastPage = totalPages - 1;

            const startPage = leftBound > 2 ? leftBound : 2;
            const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

            pages = range(startPage, endPage);

            const pagesCount = pages.length;
            const singleSpillOffset = totalNumbers - pagesCount - 1;

            const leftSpill = startPage > 2;
            const rightSpill = endPage < beforeLastPage;

            const leftSpillPage = LEFT_PAGE;
            const rightSpillPage = RIGHT_PAGE;

            if (leftSpill && !rightSpill) {
                const extraPages = range(startPage - singleSpillOffset, startPage - 1);
                pages = [leftSpillPage, ...extraPages, ...pages];
            } else if (!leftSpill && rightSpill) {
                const extraPages = range(endPage + 1, endPage + singleSpillOffset);
                pages = [...pages, ...extraPages, rightSpillPage];
            } else if (leftSpill && rightSpill) {
                pages = [leftSpillPage, ...pages, rightSpillPage];
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    };

    render() {
        if (!this.totalRecords) return null;

        if (this.totalPages === 1) return null;
        
        const { currentPageTable } = this.state;
        const pages = this.fetchPageNumbers();

        return (
            <Fragment>
                <ul className="pagination">
                    {pages.map((page, index) => {
                        if (page === LEFT_PAGE)
                            return (
                                <li key={index} className="page-item">
                                    <a
                                        className="page-link"
                                        href="/#"
                                        aria-label="Previous"
                                        onClick={this.handleMoveLeft}
                                    >
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                            );

                        if (page === RIGHT_PAGE)
                            return (
                                <li key={index} className="page-item">
                                    <a
                                        className="page-link"
                                        href="/#"
                                        aria-label="Next"
                                        onClick={this.handleMoveRight}
                                    >
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            );

                        return (
                            <li
                                key={index}
                                className={`page-item${
                                    currentPageTable === page ? " active" : ""
                                    }`}
                            >
                                <a
                                    className="page-link"
                                    href="/#"
                                    onClick={e => this.handleClick(page, e)}
                                >
                                    {page}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </Fragment>
        );
    }
}

AppPagination.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    onPageChanged: PropTypes.func
}

export default AppPagination;