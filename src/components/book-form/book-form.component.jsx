import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';

import { createBook, editBook } from '../../redux/book/book.actions';

class BookForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isbn: '',
      title: '',
      pages: 0,
      published: 0,
      newImage: '',
      image: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();

    data.append('isbn', this.state.isbn);
    data.append('title', this.state.title);
    data.append('pages', this.state.pages);
    data.append('published', this.state.published);

    if (this.state.newImage || this.state.newImage != '') {
      data.append('image', this.state.newImage);
    }

    if (this.props.singleBook) {
      this.props.editBook(this.state.isbn, data);
    } else {
      this.props.createBook(data);
    }
  };

  componentDidMount = () => {
    this.setState(this.props.singleBook);
  };

  render() {
    return (
      <Form>
        <FormInput
          handleChange={this.handleChange}
          label='ISBN'
          controlId='formIsbn'
          type='text'
          placeholder='Enter ISBN'
          name='isbn'
          value={this.state.isbn}
        />

        <FormInput
          handleChange={this.handleChange}
          label='Title'
          controlId='formTitle'
          type='text'
          placeholder='Enter book title'
          name='title'
          value={this.state.title}
        />

        <FormInput
          handleChange={this.handleChange}
          label='Pages'
          controlId='formPages'
          type='number'
          placeholder='Enter number of pages'
          name='pages'
          value={this.state.pages}
        />

        <FormInput
          handleChange={this.handleChange}
          label='Published'
          controlId='formPublished'
          type='number'
          placeholder='Enter books year of publishing'
          name='published'
          value={this.state.published}
        />

        <Form.Group controlId='formFile'>
          <Form.Label>Upload Image</Form.Label>
          <Form.File
            onChange={this.handleFileChange}
            id='image'
            name='newImage'
            placeholder='Upload image'
          />
          <Form.Text>Error handle here</Form.Text>
        </Form.Group>

        <Button variant='primary' type='submit' onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = ({ book }) => ({
  singleBook: book.singleBook,
});

const mapDispatchToProps = (dispatch) => ({
  createBook: (data) => dispatch(createBook(data)),
  editBook: (bookId, data) => dispatch(editBook(bookId, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
