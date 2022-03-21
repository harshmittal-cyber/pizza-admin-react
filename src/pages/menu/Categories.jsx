import React,{useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { createCategory } from '../../redux/actions/categoryAction';

const Categories = () => {
  const dispatch=useDispatch();
  const [category,setCategory]=useState('');
  const [error,setError]=useState(null);
  const {user}=useSelector((state)=>state.userReducer)
  const {categories}=useSelector((state)=>state.categoryReducer)
  
  const handleChange = (e) =>{
    setError(null)
    setCategory(e.target.value)
  }

  const addCategory = () =>{
    if(!category){
      setError('Enter a Category')
    }else{      
      dispatch(createCategory(user._id, category))
    }
    setCategory('');
  }

  return (
    <section className='pb-10'>
      
    <div className="row d-flex justify-content-between align-items-center mb-10">
      <div className="col-2">
        <h3 h2 className=''>Categories</h3>
      </div>

      <div className="col-6 row">
        <div className="col-8">
          <input className='form-control' type="text" name="" id="" value={category}
            placeholder='Category Name' onChange={handleChange}/>
          {error && <p>{error}</p>}
        </div>

        <button className='col-4 btn btn-primary btn-sm' onClick={addCategory}>Add New Category</button>
      </div>
    </div>

    <div className="row g-6">
      {categories.map((item, index)=>(
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <p className='mb-0 text-dark'>{item.name}</p>
            </div>
          </div>
        </div>
        ))}
    </div>

  </section>
  )
}

export default Categories