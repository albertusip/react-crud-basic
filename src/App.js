import React, { Component } from 'react';
import axios from 'axios';
import AppBar from "@material-ui/core/AppBar";
import AppTopBar from "./components/AppTopBar";
import AppContent from "./components/AppContent";
import AppPagination from "./components/AppPagination";
import './App.css';

class AppComponent extends Component {
    state = {
        allData: [],
        currentData: [],
    };

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                const allData = res.data;
                
                this.setState({ allData })
                
            })
    };

    onPageChanged = data => {
        const { allData } = this.state;
        const { currentPageTable, totalPages, pageLimit } = data;

        const offset = (currentPageTable - 1) * pageLimit;
        const currentData = allData.slice(offset, offset + pageLimit);

        this.setState({currentPageTable, currentData, totalPages });
    }

    render() {
        const {
            allData,
            currentData,
        } = this.state

        const totalData = allData.length;

        if (totalData === 0 ) return null;
        //console.log(totalData)
        return (
            <div>
                <AppBar position="static" color="default">
                  <AppTopBar />
                </AppBar>

                <div className="container mt-5">
                    <div className="row"> 
                        <div className="col-sm-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Title</th>
                                        <th>Body</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map(data => (
                                      <AppContent key={data.id} id={(data.id)} data={data} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-12">
                            <AppPagination
                                totalRecords={totalData}
                                pageLimit={5}
                                pageNeighbours={1}
                                onPageChanged={this.onPageChanged}
                            />        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppComponent;
