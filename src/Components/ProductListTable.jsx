import ProductItem from "../Partials/ProductItem";
import { Dropdown, Form, Button } from 'react-bootstrap';
import AddProductPage from "../Modal/AddProductPage";
import axios from "axios";
import { useMemo, useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from "react-redux";
import { clearProductFiler, setProductFilter } from "../store/slices/productFilter-slice";
import ReactPaginate from 'react-paginate';


export default function ProductListTable() {
    const productFilter = useSelector(state => state.filteredProduct)

    const { haveProduct, filteredProducts } = productFilter
    const dispatch = useDispatch()

    const [products, setProducts] = useState([])
    const [filterCategoriesList, setfilterCategorieList] = useState([])

    // search filter
    const [searchFilter, setSearchFilter] = useState('')

    // category filter
    const [categoryFilter, setFilterCategory] = useState('')

    // price filter
    const [priceFilterVal, setPriceFilterval] = useState([0, 0])
    const [minPriceVal, setMinPriceVal] = useState(0)
    const [maxPriceVal, setMaxPriceVal] = useState(0)

    // stock Filter
    const [stockFilterVal, setStockFilterVal] = useState([0, 0])
    const [minStockVal, setMinStockVal] = useState(0)
    const [maxStockVal, setMaxStockVal] = useState(0)


    const [currentPageProduct, setCurrentPage] = useState(0);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    const itemsPerPage = 10;

    const pageCount = Math.ceil(products.length / itemsPerPage);

    const offset = currentPageProduct * itemsPerPage;
    const currentPageData = products.slice(offset, offset + itemsPerPage);


    useMemo(() => {
        if (haveProduct) {
            setProducts(filteredProducts)
        }
        else {
            axios.get(`/api/product`)
                .then((res) => {
                    const { data } = res.data
                    setProducts(data)
                }).catch(err => console.log(err))
        }
    }, []);

    useMemo(() => {
        let filterCategory = []

        for (let i of products) {
            if (filterCategory.includes(i.category)) {
                continue
            }
            else {
                filterCategory.push(i.category)
            }
        }
        setfilterCategorieList(filterCategory)

        let priceList = products.map((item) => item.price)
        if (priceList.length > 0) {
            const min = priceList.reduce(function (a, b) {
                return Math.min(a, b);
            })
            const max = priceList.reduce(function (a, b) {
                return Math.max(a, b);
            })

            setPriceFilterval([min, max])
            setMinPriceVal(min)
            setMaxPriceVal(max)
        }

        let stockList = products.map((item) => item.stock)
        if (stockList.length > 0) {
            const stockmin = stockList.reduce(function (a, b) {
                return Math.min(a, b);
            })
            const stockmax = stockList.reduce(function (a, b) {
                return Math.max(a, b);
            })
            setStockFilterVal([stockmin, stockmax])
            setMinStockVal(stockmin)
            setMaxStockVal(stockmax)
        }
    }, [products])


    const handlePriceChange = (event, newPriceValue) => {
        setPriceFilterval(newPriceValue);
    };

    const handleStockChange = (event, newStockValue) => {
        setStockFilterVal(newStockValue);
    };

    const handelSubmitFilter = (e) => {
        e.preventDefault();

        dispatch(clearProductFiler())
        axios.get(`/api/product?search=${searchFilter}&category=${categoryFilter}&price[gt]=${priceFilterVal[0]}&price[lt]=${priceFilterVal[1]}&stock[gt]=${stockFilterVal[0]}&stock[lt]=${stockFilterVal[1]}`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    const setFilter = { haveProduct: true, filteredProducts: data.data, message: "have data" }
                    dispatch(setProductFilter(setFilter))
                    window.location.reload(true)
                }
                else {
                    alert("Not Found")
                    dispatch(clearProductFiler())
                    window.location.reload(true)
                }
            }).catch(({ response }) => console.log(response.data))
    }

    return (
        <>
            <div className="table-header">
                <div className="row mb-4">
                    <div className="col-lg-7 col-md-7 col-sm-7">

                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5 d-flex align-items-center justify-content-end">
                        <Dropdown className="d-inline-block">
                            <Dropdown.Toggle id="filterDD" className="only-button-dd me-3">
                                <i className="fa fa-sliders slider_icon text-primary-hover"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="filterDropdown">
                                <Dropdown>
                                    <div className="filter_header">
                                        Filter Options
                                    </div>
                                    <form method="POST" onSubmit={handelSubmitFilter}>
                                        <div className="filter_options">
                                            <div className="field search-field mb-4">
                                                <input type="text" placeholder="Search" id="search" value={searchFilter} className="form-control" onChange={(e) => { setSearchFilter(e.target.value) }} />
                                            </div>

                                            <div className="field mb-4">
                                                <h4 className="mb-3">Category</h4>
                                                <ul className="list-inline ps-0">

                                                    {
                                                        Array.from(filterCategoriesList).length == 1 ? filterCategoriesList.map((item, ind) => <li key={ind}><Form.Check label={item} name="category" type="radio" id={item} value={item} className="d-flex align-items-center checkbox-item" onChange={(e) => setFilterCategory(e.target.value)} checked /></li>) : filterCategoriesList.map((item, ind) => <li key={ind}><Form.Check label={item} name="category" type="radio" id={item} value={item} className="d-flex align-items-center checkbox-item" onChange={(e) => setFilterCategory(e.target.value)} /></li>)

                                                    }

                                                </ul>
                                            </div>


                                            <div className="field mb-3">
                                                <h4 className="mb-3">Price</h4>
                                                <Box sx={{ width: '100%', padding: '0 1rem' }}>
                                                    <Slider
                                                        value={priceFilterVal}
                                                        onChange={handlePriceChange}
                                                        valueLabelDisplay="auto"
                                                        min={minPriceVal}
                                                        max={maxPriceVal}
                                                    />
                                                </Box>
                                            </div>

                                            <div className="field mb-3">
                                                <h4 className="mb-3">Stock</h4>
                                                <Box sx={{ width: '100%', padding: '0 1rem' }}>
                                                    <Slider
                                                        value={stockFilterVal}
                                                        onChange={handleStockChange}
                                                        valueLabelDisplay="auto"
                                                        min={minStockVal}
                                                        max={maxStockVal}
                                                    />
                                                </Box>
                                            </div>
                                        </div>
                                        <div className="filter_bottom text-end">
                                            {
                                                haveProduct ? <Button variant="outline-primary" type="button" size={"sm"} className="me-3" onClick={() => {
                                                    dispatch(clearProductFiler())
                                                    window.location.reload(true)
                                                }}>Clear Filter</Button> : ''
                                            }



                                            <Button variant="primary" type="submit" size={"sm"}>Apply</Button>
                                        </div>
                                    </form>
                                </Dropdown>
                            </Dropdown.Menu>
                        </Dropdown>
                        <AddProductPage />
                    </div>
                </div>
            </div>
            <div className="table-body">
                <div className="body-header d-flex align-items-center">
                    <div className="product-column width-32">Product</div>
                    <div className="sku-column width-12">SKU</div>
                    <div className="qty-column width-10">Stock</div>
                    <div className="price-column width-10">Price</div>
                    <div className="rating-column width-10">Rating</div>
                    <div className="category-column width-16">Category</div>
                    <div className="action-column width-10">Action</div>
                </div>

                <div className="body-content">
                    <ProductItem data={currentPageData} />
                </div>
            </div>
            <div className="table-footer">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        {
                            currentPageData.length > 0 ? <Dropdown>
                                <Dropdown.Toggle id="pageSizeDD" className='btn-action text-black' style={{ "width": "7rem" }}>
                                    10 <i className="fa fa-angle-down"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='action-dd-menu'>
                                    <Dropdown.Item href="#" className="text-center">10</Dropdown.Item>
                                    <Dropdown.Item href="#" className="text-center">25</Dropdown.Item>
                                    <Dropdown.Item href="#" className="text-center">50</Dropdown.Item>
                                    <Dropdown.Item href="#" className="text-center">100</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> : ''
                        }
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 d-inline-flex justify-content-end">
                        {
                            currentPageData.length > 0 ? <ReactPaginate
                                previousLabel={<span aria-hidden="true"><i className="fa fa-chevron-left"></i></span>}
                                nextLabel={<span aria-hidden="true"><i className="fa fa-chevron-right"></i></span>}
                                pageCount={pageCount}
                                onPageChange={handlePageChange}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                nextClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextLinkClassName={'page-link'}
                                breakClassName={'page-item break-item'}
                                breakLinkClassName={'page-link break-link'}
                            /> : ''
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
