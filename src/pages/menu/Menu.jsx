import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

const Menu = () => {
  const dispatch=useDispatch();
  const {categories}=useSelector((state)=>state.categoryReducer)
  
  const handleCategoryChange = (category) =>{


    console.log(category)
  }

  const handleCategoryDelete = (category) =>{
    console.log(category)
  }

  return (
    <section className='pb-10'>
    {categories.map((category, index)=>(
    <div key={index} className="card mt-5 px-0" id={category.id}>
      <div className="card-header border-bottom d-flex align-items-center">
        <h5 className="me-auto">{category.name}</h5>
        <div className="dropdown">
          <span className="text-muted" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="bi bi-three-dots-vertical"></i>
          </span>
          <div className="dropdown-menu">
            
            <button className="dropdown-item cursor-pointer text-primary-hover"
                  onClick={() =>handleCategoryChange(category)}>
              Edit Name
            </button>
            
            <Link to='/additem'>
              <span className="dropdown-item cursor-pointer text-primary-hover">Add new item</span>
            </Link>
            
            <button className="dropdown-item cursor-pointer text-primary-hover"
              onClick={() =>handleCategoryDelete(category)}>
              Delete Categroy
            </button>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-nowrap">
          <thead className="table-light">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.items.map((item, index)=>(
            <tr key={index} className="text-heading">
              <td><img className='shadow' src={item.image}
                  style={{objectFit: "cover", objectPosition: "center", borderRadius: "8px", height: "50px", width: "50px"}}
                  alt="" /></td>
              <td>{item.name}</td>
              <td>{item.price}Rs</td>
              {item.isVeg ? <td><span class="badge badge-lg badge-dot"><i class="bg-success"></i>Veg</span></td> : <td>
                <span class="badge badge-lg badge-dot"><i class="bg-danger"></i>Non Veg</span></td>}
              {item.isAvailable ? <td><span
                  className='bg-soft-success text-success rounded-pill badge badge-sm fw-normal'>Available</span></td> :
              <td><span className='bg-soft-danger text-danger rounded-pill badge badge-sm fw-normal'>Not Available</span>
              </td>}

              <td>
                <button className='btn btn-neutral btn-sm me-3'>Unavailable</button>
                <button className='btn btn-neutral btn-sm me-3'><i className='bi bi-pencil'></i></button>
                <button className='btn btn-neutral btn-sm'><i className='bi bi-trash'></i></button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    ))}

  </section>
  )
}

export default Menu