import { useState } from 'react';
import { Link } from 'react-router-dom';

function Index(props) {
    const [newForm, setNewForm] = useState({
        name: "",
        image: "",
        title: "",
    })

    // handleChange will capture user input as it's typed
    const handleChange = (event) => {
        setNewForm((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    // handleSubmit will submit our new user for creation
    const handleSubmit = (event) => {
        event.preventDefault()
        props.createPeople(newForm)
        setNewForm({
            name: "",
            image: "",
            title: "",
        })
    }

    const loaded = () => {
        return props.people.map((person) => (
            <div key={person._id} className='person'>
                <Link to={`/people/${person._id}`}>
                    <h1>{person.name}</h1>
                </Link>
                <img src={person.image} alt={person.name} />
                <h3>{person.title}</h3>
            </div>
        ))
    }
    
    const loading = () => {
        return <h1>Loading ...</h1>
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={newForm.name}
                name="name"
                placeholder="name"
                onChange={handleChange}
                />
                <br />
                <input
                type="text"
                value={newForm.image}
                name="image"
                placeholder="image URL"
                onChange={handleChange}
                />
                <br />
                <input
                type="text"
                value={newForm.title}
                name="title"
                placeholder="title"
                onChange={handleChange}
                />
                <br />
                <input type="submit" value="Create Person" />
            </form>
            {props.people ? loaded() : loading()}
        </section>
    )
}
  
export default Index;