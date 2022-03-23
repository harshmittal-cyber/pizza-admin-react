import React, { useState, useEffect } from 'react'

const closeBtn = <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C10.866 14 14 10.866 14 7Z" fill="#194A44" />
    <path d="M4.19995 9.8002L9.79995 4.2002" stroke="#A3B7B4" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9.79995 9.8002L4.19995 4.2002" stroke="#A3B7B4" stroke-linecap="round" stroke-linejoin="round" />
</svg>

const close = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.7998 11.2L11.1998 4.80005" stroke="#ff8c00" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.1998 11.2L4.7998 4.80005" stroke="#ff8c00" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

const TagsInput = (props) => {

    const [error, setError] = useState();
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([...props.defaultTags]);

    useEffect(() => {
        setTags([])
        props.onChange([])
        setTags(props.defaultTags);
        setTag('')
    }, [props.resetTags])


    const inputChangeHandler = (e) => {
        const re = /^[a-zA-Z0-9]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setTag(e.target.value);
            setError('')
        } else {
            e.preventDefault();
            setTimeout(() => {
                setError('tag should be text')
            }, 200);
        }
        //  else {
        //     setTag(e.target.value);
        //     setError('')
        // }
    }

    const setInputTags = (e) => {
        e.preventDefault();
        setError('');
        if ((e.target.value !== '' || e.target.value !== ' ') && (e.key === 'Enter')) {
            const newTag = tag.toLowerCase();
            let err = tags.find((tag) => tag.toLowerCase() === newTag)
            if (err) {
                setError('Tag already exists');
                // setTag('');
            } else if (!tags.includes(newTag) && newTag !== '') {
                const arr = [...tags, tag];
                setTags(arr);
                setTag('');
                props.onChange(arr);
            }
        }
    }

    const removeTags = (e, tag) => {
        e.preventDefault();
        const arr = tags.filter(t => t !== tag);
        setTags(arr);
        props.onChange(arr);
    }

    return (
        <div>
            <div className='d-flex flex-wrap'>
                {tags.map((tag, i) =>
                    <div className='rounded-pill bg-soft-warning px-3 me-3 mt-3 d-flex'>
                        <p className='text-warning'>{tag}</p>
                        <span className='tag-delete-btn' onClick={(e) => removeTags(e, tag)}>{close}</span>{' '}
                    </div>
                )}
            </div>

            <input className="form-control mt-3" type="text" value={tag}
                placeholder="Add Tags" onChange={inputChangeHandler}
                onKeyUp={setInputTags}
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
            />

            {error ? <p className="text-danger">{error}</p> : ''}
        </div>
    )
}

export default TagsInput;
