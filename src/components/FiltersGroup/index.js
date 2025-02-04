import './index.css'
import {FaSearch} from 'react-icons/fa'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    changesearchitems,
    clearFilter,
    titleSearch,
  } = props

  const {titleSearch} = details
  const {categoryId} = categoryOptions
  const {ratingId} = ratingsList
  const categorychange = () => {
    changeCategory(categoryId)
  }
  const ratingchange = () => {
    changeRating(ratingId)
  }

  const clearall = () => {
    clearFilter()
  }
  const changesearch = event => {
    const searchvalue = event.target.value
    changesearchitems(searchvalue)
    changesearchitems(event.target.value)
  }
  return (
    <div className="filters-group-container">
      <div className="searchcard">
        <input
          className="input"
          type="search"
          placeholder="search"
          value={titleSearch}
          onChange={changesearch}
        />
        <FaSearch className="sort-by-icon" />
      </div>
      <h1 className="headingis">Category</h1>
      <ul className="categorycard">
        {categoryOptions.map(each => {
          const {changeCategory} = props
          const categorychange = () => {
            changeCategory(each.categoryId)
          }
          return (
            <li key={each.categoryId} className="list">
              <p className="categorybutton" onClick={categorychange}>
                {each.name}
              </p>
            </li>
          )
        })}
      </ul>
      <h1 className="headingis">Rating</h1>
      <ul className="ratingcard">
        {ratingsList.map(each => {
          const {changeRating} = props

          const ratingchange = () => {
            console.log(each.ratingId)
            changeRating(each.ratingId)
          }
          return (
            <li key={each.ratingId} className="rate">
              <img
                className="ratingimage"
                src={each.imageUrl}
                alt={`rating ${each.ratingId}`}
                onClick={ratingchange}
              />
              <p className="rated">& up</p>
            </li>
          )
        })}
      </ul>
      <div className="categorycard">
        <h1 className="headingis">Category</h1>
        {categoryOptions.map(each => (
          <button
            key={each.categoryId}
            className="categorybutton"
            type="button"
            onClick={categorychange}
          >
            {each.name}
          </button>
        ))}
      </div>
      <div className="ratingcard">
        <h1 className="headingis">Rating</h1>
        {ratingsList.map(each => (
          <div className="rate">
            <img
              className="ratingimage"
              src={each.imageUrl}
              alt={`rating ${each.ratingId}`}
              onClick={ratingchange}
              key={each.ratingId}
            />
            <p className="rated">& up</p>
          </div>
        ))}
      </div>
      <button className="clearbutton" type="button" onClick={clearall}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
