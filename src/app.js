//aplicação para o ReactDOM
import React from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'; //componentes do react router dom

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul /* aqui eu crio os links */> 
                        <li> <Link to="/sign-in"> Sing In </Link> </li>
                        <li> <Link to="/sign-up"> Sing Up </Link> </li>
                        <li> <Link to="/manage/links/create"> Create Link </Link> </li>
                        <li> <Link to="/manage/links/edit"> Edit Link </Link> </li>
                        <li> <Link to="/manage/links"> Links </Link> </li>
                    </ul>
                </nav>
                <Switch /* aqui é onde o link se redireciona */>
                    <Route path="/sign-in"><h1>Sing In</h1></Route>
                    <Route path="/sign-up"><h1>Sing Up</h1></Route>
                    <Route path="/manage/links/create"><h1>Create Link</h1></Route>
                    <Route path="/manage/links/edit"><h1>Edit Link</h1></Route>
                    <Route path="/manage/links"><h1>Links</h1></Route>
                    <Route path="/"><h1>Home</h1></Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
