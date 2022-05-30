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
    const { searchValue } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.formSubmit} />
        <ToastContainer />
        <ImageGallery searchValue={searchValue} />
      </>
    );
  }
}
export default App;
