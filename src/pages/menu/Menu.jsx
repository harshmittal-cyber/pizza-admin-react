import React,{useEffect,useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCategory, getCategories,createCategory ,updateCategory,selectedCategory} from '../../redux/actions/categoryAction';
import {deleteItem ,createItem} from '../../redux/actions/itemAction';
import Toaster from '../../utility/Toaster';
import Modal from '../../utility/Modal';
import TagsInput from './TagsInput'

const Menu = () => {
  const dispatch=useDispatch();
  const {categories,message,error,loading,selectedcategory}=useSelector((state)=>state.categoryReducer)
  const {user}=useSelector((state)=>state.userReducer);
  const [category,setCategory]=useState('');
  const [redirect,setRedirect]=useState(false);
  const [toaster,setToaster]=useState(false);
  const [inputs,setInputs]=useState({itemName:'',description:'',price:'',tags:[]})
  const [resetTags,setResetTags]=useState(false);
  const [checked,setChecked]=useState(false);
  const [categoryId,setCategoryId]=useState(categories.length!==0 && categories[0]._id)
  
  // edit category
  const [editCategory,setEditCategory]=useState({name:''});
  useEffect(()=>{
    if(categories.length===0){
      const userId=user._id
      dispatch(getCategories({userId}))
    }
  },[])

  //category changes
  const handleCategoryChange = (e) =>{
    setCategory(e.target.value)
  }

  const handleCategoryValue = (e, category) => {
    dispatch(selectedCategory(JSON.parse(category)))
    setCategoryId(category._id);
  }

  const handleCategorySubmit =async (e,isRedirect) =>{
    e.preventDefault();
    if(category.trim().length<1){
      displayErrorFunction("Plese Enter a Category Name")
    }else{
      let filterCategory =await categories.filter(cate => cate.name.trim().toLowerCase() === category.trim().toLowerCase());

      if(filterCategory.length<1){
        setRedirect(isRedirect);
        await dispatch(createCategory(user._id, category, isRedirect))
        .then(res=>{
          console.log('res',res)
          if(res.success){
            setToaster(true)
            closeCategoryModal();
            setCategory('')
            if(isRedirect){
              addItemModalHandler()
            }
          }
        })
      }else{
        displayErrorFunction('Category Already Exist')
      }
    }
  }

  const handleCategoryDelete = (category) =>{
    dispatch(deleteCategory(category._id))
  }

  // catgeory update
  const handleCategoryUpdateChange=(e)=>{
    setEditCategory(prev=>{
      return {
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

  const handleCategoryUpdate=async ()=>{
    if(editCategory.name.trim().length<1){
      displayErrorFunction("Plese Enter a Category Name")
    }else{
      let filterCategory =await categories.filter(cate =>(cate._id!==editCategory._id) && (cate.name.trim().toLowerCase() === editCategory.name.trim().toLowerCase()));
      
      if(filterCategory.length<1){
        dispatch(updateCategory(user._id, editCategory))
        .then(res=>{
          if(res.success){
            setToaster(true)
            closeUpdateCategoryModal();
            setEditCategory({name:''})
          }
        })
      }else{
        displayErrorFunction('Category Already Exist')
      }
    }
  }

  const updateCategoryModalHandler=(category)=>{
    document.getElementById("updatecategoryname").click();
    setEditCategory({
      ...category,
      name:category.name
    })
  }


  // item functions
  const handleAddItemChange=(e)=>{
    if (e.target.name === 'isNonVeg') {
        e.target.value = e.target.checked
        setChecked(!checked)
    }
    setInputs((prev)=>{
      return {
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

  const tagHandler=(tags)=>{
    setInputs(prev=>{
      return {
        ...prev,
        tags:tags
      }
    })
    setResetTags(false)
  }

  const handleAddItem=async (e,isMore)=>{
    e.preventDefault()
  
    let category=Object.keys(selectedcategory).length!==0?selectedcategory._id:categoryId
    let newItem={...inputs,categoryId:category};


   dispatch(createItem(user._id,newItem)).then((res)=>{
     console.log('res',res)
      if(res.success){
        setToaster(true)
        setInputs({itemName:'',description:'',price:'',tags:[]})
        setChecked(false)
        setResetTags(true)
        closeItemModal()
        if(isMore){
          addItemModalHandler()
        }
      }
   })
  }


  const handleItemDelete=(itemId)=>{
    dispatch(deleteItem(itemId))
  }

  // modals
  const addItemModalHandler = () => {   
    if(categories.length>0){
      dispatch(selectedCategory(categories[0]))
      document.getElementById("additemmodalbutton").click()
    }
  }

  //close and open add item modal
  const closeItemModal=()=>{
    document.getElementById("closeadditemmodal").click();
  }

  //close and open modal
  const closeCategoryModal = () => {
    let closeModalButton = document.getElementById("closecategorymodal")
    closeModalButton.click()
  }

  const closeUpdateCategoryModal=()=>{
    let closeModalButton = document.getElementById("closeupdatecategorymodal")
    closeModalButton.click()
  }

  const displayErrorFunction=(message)=>{

  }


  return (
    <section className='pb-10'>
       <div className="mt-5 d-flex justify-content-between align-items-center flex-wrap">
        <h1>Category List <span className='text-dark' style={{fontSize:"1rem"}}>({categories.length})</span></h1>
        <div className='d-flex align-items-center flex-wrap'>
          <div className="d-flex bg-white shadow rounded py-2 px-4" style={{minWidth:"300px"}}>
            <span className='bi bi-search me-3'></span>
            <input type="text" className='form-group w-100' placeholder='Search Food'/>
          </div>
          <button className='btn btn-primary mx-4' data-bs-toggle="modal" data-bs-target="#categoryModal">Add Category</button>
          <button className='btn btn-primary' data-bs-toggle="modal" onClick={addItemModalHandler}>Add Item</button>
        </div>
      </div>

      <Modal targetName={'categoryModal'}>
      <div className='p-lg-5 p-1 text-center'>
          <h1>Add Category</h1>
          <p>Make the most out of your new category by adding items to it. Categories with no item will not be displayed</p>
          <form id='category-form' onSubmit={(e)=>handleCategorySubmit(e)}  autoComplete='off'>
              {/* CategoryName */}
              <div className="mt-5 pt-5">
                <label htmlFor="categoryname" className='w-100 text-start'>Category Name</label>
                <input type="text" name="categoryname" className='form-control' placeholder='Enter Category Name'
                  value={category} onChange={handleCategoryChange} style={{backgroundColor:"#EDF2F7"}} />
              </div>
              
              {/* Buttons */}
              <div className="row">
                {/* Save */}
                <div className="col-md-6 col-sm-12 mt-4 pt-5">
                  <button className='btn btn-outline-primary w-100' onClick={(e)=>handleCategorySubmit(e,false)}>
                   {(loading && !redirect)?<div className="spinner-border text-secondary loader-sizing" role="status"><span className="sr-only"></span></div>:'Save'}        
                  </button>
                </div>
                {/* Save&Next */}
                <div className="col-md-6 col-sm-12 mt-4 pt-0 pt-md-5">
                  <button className='btn btn-primary w-100' onClick={(e)=>handleCategorySubmit(e,true)}>
                  {(loading && redirect) ? <div className="spinner-border text-secondary loader-sizing" role="status"><span className="sr-only"></span></div> : <span>Save & Add Item</span>}
                  </button>
                </div>
              </div>
          </form>
        </div>
      <button className='d-none' data-bs-dismiss="modal" id="closecategorymodal">Close any modal</button>
      </Modal>

    {/* add item modal */}
      <Modal targetName={'additemmodal'}>
        <div className='p-5 text-center'>
          <h1 className='pb-5'>Add Item</h1>
          <form id='item-form' autoComplete='off'>
          <div className='mt-5'>
              <label htmlFor="categoryId" className='w-100 text-start'>Select Category</label>
              <select className='form-select text-capitalize' name="categoryId" 
              value={Object.keys(selectedcategory).length>1?JSON.stringify(selectedcategory): categories.length!==0? JSON.stringify(categories[0]) : JSON.stringify({})}
              onChange={(e) => handleCategoryValue(e, e.target.value)}  id="" style={{backgroundColor:"#EDF2F7"}}>
                {
                  categories.map((cate,index)=>(
                    <option key={index} value={JSON.stringify(cate)}>{cate.name}</option>
                  ))
                }
              </select>
            </div>
            <div className='mt-5'>
              <label htmlFor="itemName" className='w-100 text-start'>Item Name</label>
              <input className='form-control' type="text" name="itemName" id="" 
                onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
                placeholder='Enter Item Name' style={{backgroundColor:"#EDF2F7"}}
                value={inputs.itemName} onChange={handleAddItemChange} 
              />
              {/* <span className='text-danger'>{addItemError.itemNameError}</span> */}
            </div>
            <div className='mt-5'>
              <label htmlFor="description" className='w-100 text-start'>Item Description</label>
              <input className='form-control' type="text" 
              onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()} 
              name="description" id="description" placeholder='Enter Item Description' style={{backgroundColor:"#EDF2F7"}} 
              value={inputs.description} onChange={handleAddItemChange} 
               />
            </div>
            <div className='mt-5'>
              <label htmlFor="price" className='w-100 text-start'>Item Price</label>
              <input className='form-control' type="text" name="price" 
              id="price" placeholder='Enter Item Price' style={{backgroundColor:"#EDF2F7"}}
              value={inputs.price} onChange={handleAddItemChange} 
              />
            </div>
            <div className='mt-5'>
              <label htmlFor="tags" className='w-100 text-start'>Tags</label>
              <TagsInput onChange={tagHandler} resetTags={resetTags} defaultTags={[...inputs.tags]}/>              
            </div>
            <div className='mt-5 d-flex align-items-center justify-content-between'>
                <p className="mb-0">Mark as Non - Veg</p>
                <div className="form-check form-switch">
								<input className="form-check-input" type="checkbox" name="isNonVeg"
                onChange={handleAddItemChange}
                checked={checked}
              />
							</div>
            </div>
            <div className="row mt-5">
                <div className='col-6'>
                  <button className='btn btn-outline-primary w-100' onClick={(e)=>handleAddItem(e,false)}>
                    <span >Save</span>
                  </button>
                </div>
                <div className='col-6'>
                  <button className='btn btn-primary w-100' onClick={(e)=>handleAddItem(e,true)}>
                    <span>Add more</span>
                  </button>
                </div>
              </div>
          </form>
        </div>
        <button className='d-none' data-bs-dismiss="modal" id="closeadditemmodal">Close any modal</button>
      </Modal>

      {/* update category Modal */}
      <Modal targetName={'updateCategoryName'}>
        <div className='p-lg-5 p-1 text-center'>
            <h1>Edit Name</h1>
            <p>Make the most out of your new category by adding items to it. Categories with no item will not be displayed</p>

                {/* CategoryName */}
                <div className="mt-5 pt-5">
                  <label htmlFor="categoryname" className='w-100 text-start'>New Category Name</label>
                  <input type="text"  className='form-control' placeholder='Enter Name'
                      style={{backgroundColor:"#EDF2F7"}} name="name" autoComplete="off" 
                      value={editCategory.name} onChange={handleCategoryUpdateChange}
                    />
                </div>
                
                <div className="row">
                  <div className="col-md-6 col-sm-12 mt-4 pt-5">
                    <button className='btn btn-outline-primary w-100' data-bs-dismiss="modal">
                              Cancel
                    </button>
                  </div>
                  <div className="col-md-6 col-sm-12 mt-4 pt-0 pt-md-5">
                    <button className='btn btn-primary w-100' onClick={handleCategoryUpdate}>
                        <span>Save</span>
                    </button>
                  </div>
                </div>
          </div>
          <button className='d-none' data-bs-dismiss="modal" id="closeupdatecategorymodal">Close any modal</button>      
        </Modal>

    {categories.map((category, index)=>(
    <div key={index} className="card mt-5 px-0" id={category.id}>
      <div className="card-header border-bottom d-flex align-items-center">
        <h5 className="me-auto">{category.name}</h5>
        <div className="dropdown">
          <span className="text-muted" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="bi bi-three-dots-vertical"></i>
          </span>
          <div className="dropdown-menu">
            
            <button className="dropdown-item cursor-pointer text-primary-hover" onClick={()=>updateCategoryModalHandler(category)}>
              Edit Name
            </button>
            
            <Link to='/additem' state={{categoryId:category._id}}>
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
              <td>{item.itemName}</td>
              <td>Rs {item.price}</td>
              {!item.isNonVeg ? <td><span class="badge badge-lg badge-dot"><i class="bg-success"></i>Veg</span></td> : <td>
                <span class="badge badge-lg badge-dot"><i class="bg-danger"></i>Non Veg</span></td>}
              {item.inStock ? <td><span
                  className='bg-soft-success text-success rounded-pill badge badge-sm fw-normal'>Available</span></td> :
              <td><span className='bg-soft-danger text-danger rounded-pill badge badge-sm fw-normal'>Not Available</span>
              </td>}

              <td>
                <button className='btn btn-neutral btn-sm me-3'>Unavailable</button>
                <button className='btn btn-neutral btn-sm me-3'><i className='bi bi-pencil'></i></button>
                <button className='btn btn-neutral btn-sm' onClick={()=>handleItemDelete(item._id)}><i className='bi bi-trash'></i></button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    ))}

  {toaster && message && <Toaster text={message} icon={'tick'} showIcon={true} />}
  {toaster && error && <Toaster text={error} icon={'x'} showIcon={true} />}
  {/* utility buttons for opening and closing of modals dynimically */}
  <button className='d-none' data-bs-toggle="modal" data-bs-target="#additemmodal" id='additemmodalbutton'>Open Add item modal</button>
    <button className='d-none' data-bs-toggle="modal" data-bs-target="#editItemModal" id='edititemmodalbutton'>Open Edit item modal</button>
    <button className='d-none' data-bs-toggle="modal" data-bs-target="#updateCategoryName" id='updatecategoryname'>Open Add item modal</button>
  </section>
  )
}

export default Menu