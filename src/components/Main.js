import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {

    const [people, setPeople] = useState([]);

    const URL = "https://express-react-week13day3.herokuapp.com/people/";
    // const URL = "http://localhost:3001/people/";

    const createPeople = async (person) => {
        if(!props.user) return;
        const token = await props.user.getIdToken();
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(person),
        })

        const people = await response.json();
        setPeople(people);
        
    }

    const updatePeople = async (person, id) => {
        if(!props.user) return;
        const token = await props.user.getIdToken();
        const response = await fetch(URL + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "Application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(person),
        });

        const people = await response.json();
        setPeople(people);
    }

    const deletePeople = async (id) => {
        if(!props.user) return;
        const token = await props.user.getIdToken();
        const response = await fetch(URL+id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        
        const people = await response.json();
        setPeople(people);
    };

    const handleLogout = () => {
        setPeople([]);
    }

    useEffect(() => {
        const getPeople = async () => {
            if(!props.user) return;
            const token = await props.user.getIdToken();
    
            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
    
            const data = await response.json();
    
            setPeople(data);
        }
        if(props.user) {
            getPeople()
        } else {
            handleLogout()
        }
    }, [props.user]);

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index people={people} createPeople={createPeople} />
                </Route>
                <Route path="/people/:id" render={(rp) => (
                    props.user ?
                    <Show 
                        {...rp}
                        updatePeople={updatePeople}
                        deletePeople={deletePeople}
                        people={people}
                    />
                    :
                    <Redirect to="/" />
                )} />
            </Switch>
        </main>
    )
}
  
export default Main;