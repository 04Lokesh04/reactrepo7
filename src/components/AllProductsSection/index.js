import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    titleSearch: '',
    category: '',
    ratingIs: '',
    apiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, titleSearch, category, ratingIs} = this.state
    console.log(ratingIs)
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${ratingIs}`

    const {activeOptionId, titleSerach, category, ratingIs} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSerach}&rating=${ratingIs}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
        apiStatus: 'SUCCESS',
      })
    } else if (response.status === 401) {
      this.setState({isLoading: false, apiStatus: 'FAILURE'})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  changesearchitems = searchvalue => {
    this.setState({titleSearch: searchvalue}, this.getProducts)

    const filtered = categoryOptions.filter(each =>
      each.name.toLowerCase().includes(searchvalue.toLowerCase()),
    )
    this.setState(
      {titleSearch: searchvalue, category: filtered.categoryId},
      this.getProducts,
    )
  }

  changeCategory = categoryId => {
    this.setState({category: categoryId}, this.getProducts)
  }

  changeRating = ratingId => {
    console.log(ratingId)
    this.setState({ratingIs: ratingId}, this.getProducts)
  }

  clearFilter = () => {
    this.setState(
      {
        productsList: [],
        apiStatus: 'INITIAL',
        titleSearch: '',
        titleSerach: '',

        category: '',
        ratingIs: '',
      },
      this.getProducts,
    )
  }

  rendernoproducts = () => (
    <div className="noproducts">
      <img
        className="noproductsimage"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="no products"
      />
      <h1 className="noproductshead">No Products Found</h1>
      <p className="noproductspara">
        We could not find any products. Try other filters
      </p>
    </div>
  )

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    console.log(productsList)
    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />

        {productsList.length > 0 ? (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        ) : (
          this.rendernoproducts()
        )}
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  renderfailedview = () => (
    <div className="noproducts">
      <img
        className="noproductsimage"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
      />
      <h1 className="noproductshead">Oops! Something Went Wrong</h1>
      <p className="noproductspara">
        We are having some trouble processing your request.
        <hr />
        Please try again.
      </p>
    </div>
  )

  renderany = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderProductsList()
      case 'FAILURE':
        return this.renderfailedview()
      default:
        return null
    }
  }

  render() {
    const {isLoading, titleSearch} = this.state
    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changesearchitems={this.changesearchitems}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          clearFilter={this.clearFilter}
          titleSearch={titleSearch}
          details={titleSearch}
        />
        {isLoading ? this.renderLoader() : this.renderany()}
      </div>
    )
  }
}

export default AllProductsSection
