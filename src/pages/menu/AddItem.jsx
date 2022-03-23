import React, {useState,useEffect} from 'react'
import TagsInput from './TagsInput';
import { useLocation } from 'react-router-dom';
import {createItem} from '../../redux/actions/itemAction';
import {useDispatch,useSelector} from 'react-redux'
import {clearerror} from '../../redux/actions/userAction';

const AddItem = () => {
	const {user}=useSelector((state)=>state.userReducer)  ;
	const {error}=useSelector((state)=>state.categoryReducer)
	const {state}=useLocation();
	const [categoryId,setCategoryId]=useState(state.categoryId)
    const [inputs, setInputs] = useState({ itemName: '', description: '', price: '' });
    const [resetTags, setResetTags] = useState(false);
	const [checked, setChecked] = useState(false);
	const [image,setImage]=useState('');

	const [validation, setValidation] = useState('');
    const [namevalid, setNameValid] = useState('');
	const dispatch=useDispatch()

	useEffect(()=>{
		dispatch(clearerror())
	},[error])

	const changeHandler = (tags) => {
        setInputs(prev => {
            return {
                ...prev,
                tags: tags
            }
        })
        setResetTags(false);
    }

	const handleChange = (e) => {
        setNameValid('')
        setValidation('')
        if (e.target.name === 'isNonVeg') {
            e.target.value = e.target.checked
            setChecked(!checked)
        }

        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const keypress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
        const re = /^[0-9]*$/
        if (!re.test(e.key)) {
            e.preventDefault()
            setValidation('Price should be in Number')
        } else if (re.test(e.key)) {
            setValidation('')
        }
    }

	const handleSubmit = async (e) => {
        e.preventDefault();

		let newItem = { ...inputs, categoryId:categoryId};

		await dispatch(createItem(user._id,newItem))

		setInputs({ itemName: '', description: '', price: '' })

		setResetTags(true)
		e.target.reset();
    }

  return (
    <section>
		<div className='mx-auto max-w-screen-md pb-10'>
			<div className='mt-5'>
		
				<div className="mb-5"><h4>Add Item</h4></div>
				<div className="row g-5">
					<form id='item-form' onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
						<div className="col-md-12">
							<label className="form-label">Image</label> 
							<input className='form-control' type="file" name="image"  />
						</div>
						
						<div>
							<label className="form-label">Item Name</label> 
							<input className="form-control" type="text" placeholder="Item Name" name="itemName"
								onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()} required
								onChange={handleChange} />
							{namevalid && <span className="text-danger" style={{ fontSize: '14px' }}>{namevalid}</span>}
						</div>
					
						<div className="col-md-6">
							<p className="form-label">Mark as Non-Veg</p>
							<div className="form-check form-switch">
								<input className="form-check-input" type="checkbox" name="isNonVeg" onChange={handleChange}/>
							</div>
						</div>
								
						<div className="col-md-6">
							<label className="form-label" for="email">Price</label> 
			s							<input className="form-control price-input mt-0" type="number" placeholder="Enter Price"
									data-placeholder="Rs"
									name="price" onKeyPress={keypress}
									onChange={handleChange} required
								/>
						</div>

						{validation && <span className="text-danger" style={{ fontSize: '14px' }}>{validation}</span>}
					
						<div className="col-md-12">
							<label className="form-label">Tags</label> 
							<TagsInput onChange={changeHandler} resetTags={resetTags} defaultTags={[]} />
						</div>


						<div className=	"col-md-12">
							<label className="form-label">Description</label> 
							<textarea className="form-control" type="text" cols="30" rows="5"
								placeholder="Item Description" id='textarea'
								name="description" onChange={handleChange} />
						</div>
					</form>

						<div className="col-12 text-end">
							<button type="button" className="btn btn-sm btn-danger me-2">Cancel</button> 
							<button form='item-form' type="submit" className="btn btn-sm btn-success me-2">Save</button>
							<button form='item-form' type="submit" className="btn btn-sm btn-primary">Save and Next</button>
						</div>						
				</div>


			</div>
		</div>
    </section>
  )
}

export default AddItem