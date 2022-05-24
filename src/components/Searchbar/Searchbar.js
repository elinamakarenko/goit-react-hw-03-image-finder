import { Component } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
        value: '',
      };
      valueInputId = shortid.generate();
     
      render(){
          return(
              <div className={s.searchbar}>
                   <form className={s.searchForm}>
             <label htmlFor={this.valueInputId}>
                 <input className={s.searchFormInput}/>
                
             </label>
             
             <button className={s.searchFormButton} type="submit">
          
        </button>
             </form>
             </div>
          )
      }
}

export default Searchbar;