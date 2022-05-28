import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

class App extends Component {
  state = {
    searchValue: '',
  };

  formSubmit = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.formSubmit} />
        <ToastContainer />
        <ImageGallery searchValue={this.state.searchValue} />
      </>
    );
  }
}
export default App;
