import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import BoutonNav from '../BoutonNav/BoutonNav';
import './Entete.css';

export default class Entete extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.titre);
    //this.props.titre = "Titre par défaut";  // Lecture seule
    //this.compte = 10;
    this.state = {compte:10,
                  //courriel : "",
                  //login : false
                }; // Le state contient les données du composant.

    this.boutonCliquer = this.boutonCliquer.bind(this);
    this.changeCourriel = this.changeCourriel.bind(this)
    this.login = this.login.bind(this);
  }

  boutonCliquer(){
      console.log("Click");
      console.log(this);
      //this.setState({compte:this.state.compte+1});  // À ne pas faire, parce que le setState est asynchrone!
      
      /*this.setState(function(state, props){
                      return {
                        compte : state.compte+1
                      };
                    });*/
      this.setState((state)=>({compte:state.compte+1}))
  }
	
	login(){
		let bLogin = false;
		if(this.state.login && this.state.courriel){
			bLogin =false;
			this.setState({courriel:""});
		}
		else if(!this.state.login && this.state.courriel){ // Si le courriel est non vide (non sécuritaire)!
        	bLogin = true;
        }
		this.setState({login:bLogin});
		
		if(this.props.login){
			this.props.login(bLogin);
		}
    
	}

	changeCourriel(evt){
		this.setState({courriel:evt.target.value});
	}

  	render() {
		// Il peut y avoir du code ici...
		const titre = this.props.titre || "titre par défaut";
		const login = (this.state.login ? "connecté" : "non connecté"); 
		
		let btnLogin = <button onClick={this.login}>{(this.state.login ? "Se déconnecter" : "Se connecter")}</button>;

		return (
			<header className="App-header">
				<nav>
					<div className="top-nav">
						<div className="barre">
							<Link className="logo" to="/">
								B<span>iero</span>
							</Link>
							<span className="flex-spacer"></span>
							<p className="menu-mobile"></p>
						</div>
						<span className="flex-spacer"></span>
						<ul>
							<li>
								<NavLink activeClassName="active" to="/produit">Les produits</NavLink>
							</li>
							<li>
							<input name="courriel" value={this.state.courriel} disabled={this.state.login ? 'disable' : ''} onChange={this.changeCourriel} type="text" />
							{btnLogin}
							</li>
						</ul>
					</div>
				</nav>
			</header>
		);
	}
}
