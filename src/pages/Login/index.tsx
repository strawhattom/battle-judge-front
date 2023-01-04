import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import LeftImage from '../../assets/images/ImageLoginLeft.jpg';
import Logo from '../../assets/images/sopra_steria.png';

function Login() {
    useEffect(() => {
        document.title = 'Connexion - Battle Judge';
    }, []);

    return (
        <div className="d-flex align-items-center h-100">
            <div className="col-8 d-none d-md-block" style={{ marginRight: '-20%' }}>
                <img
                    src={LeftImage}
                    alt="Image"
                    className="img-fluid"
                    style={{ width: '70%' }}
                />
            </div>
            <div className="col-4 mx-auto" style={{ marginBottom: '15%' }}>
                <img
                    src={Logo}
                    alt="Logo"
                    className="img-fluid mb-3"
                />
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Entrez votre email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Mot de passe</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Entrez votre mot de passe"
                        />
                    </FormGroup>
                    <Button style={{ backgroundColor: '#f67300' }} block>Se connecter</Button>
                    <Link to="/forgot-password" className="btn btn-link btn-block mt-2">Mot de passe oublié ?</Link>
                </Form>
            </div>
        </div>
    );
}

export default Login;
