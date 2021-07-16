import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { schema } from './validator';
import { Formik, Form } from 'formik';

const App = () => {
  const [urlData, setUrlData] = useState([]);
  //const [addTitle, setAddTitle] = useState('');
  //const [addUrl, setAddUrl] = useState('');

  const listAllUrl = () => {
    axios
      .get('http://localhost:3050/api/url')
      .then((response) => {
        // console.log(response.data);
        const result = response.data;
        setUrlData(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    listAllUrl();
  }, []);

  // const handleUrlChange = (hashUrl) => {
  //   axios.get(`http://localhost:3050/api/url/${hashUrl}`).then((response) => {
  //     console.log(response);
  //   });
  // };

  //Form submit using state
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const urlData = {
  //     title: addTitle,
  //     originalUrl: addUrl,
  //     createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
  //   };
  //   axios.post(`http://localhost:3050/api/url/`, urlData).then(() => {
  //     listAllUrl();
  //   });
  //   setAddTitle('');
  //   setAddUrl('');
  // };

  //formSubmit using formik
  const formSubmit = (data, resetForm) => {
    axios.post(`http://localhost:3050/api/url`, data).then(() => {
      listAllUrl();
    });
    resetForm();
  };

  const handleCount = (id) => {
    //alert('hi');
    axios.put(`http://localhost:3050/api/url/${id}`).then((response) => {
      const result = response.data;
      console.log(result);
      const updatedData = urlData.map((data) => {
        if (data._id === result._id) {
          return { ...data, ...result };
        } else {
          return { ...data };
        }
      });
      setUrlData(updatedData);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3050/api/url/${id}`).then((response) => {
      const result = response.data;
      const filteredData = urlData.filter((url) => url._id !== result._id);
      setUrlData(filteredData);
    });
  };

  return (
    <div>
      {/*
        <form onSubmit={handleSubmit}>
          <input type='text' value={addTitle} onChange={(e) => setAddTitle(e.target.value)} placeholder='title...' />
          <br />
          <input type='text' value={addUrl} onChange={(e) => setAddUrl(e.target.value)} placeholder='url..' />
          <br />
          <button type='submit'>Add</button>
        </form>
     */}
      <h1>URL-Shortner</h1>
      {
        <Formik
          //EnableReinitialize will reset and re-renders the form component
          enableReinitialize
          initialValues={{
            title: '',
            originalUrl: '',
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
          }}
          validationSchema={schema}
          onSubmit={(data, { resetForm }) => formSubmit(data, resetForm)}>
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => {
            //console.log(errors);
            return (
              <Form onSubmit={handleSubmit}>
                <input type='text' name='title' onChange={handleChange} onBlur={handleBlur} value={values.title} placeholder='title' />
                <span style={{ color: 'red' }}>{errors.title}</span>
                <input type='text' name='originalUrl' onChange={handleChange} onBlur={handleBlur} value={values.originalUrl} placeholder='originalUrl' />
                <button type='submit'>submit</button>
                <span style={{ color: 'red' }}>{errors.originalUrl}</span>
              </Form>
            );
          }}
        </Formik>
      }

      <br />
      <table border={2}>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Original Url</th>
            <th>Hash Url</th>
            <th>Click Count</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {urlData.map((url, idx) => {
            const { _id, title, originalUrl, hashUrl, createdAt, count } = url;
            return (
              <tr key={_id}>
                <td>{idx + 1}</td>
                <td>{title}</td>
                <td>{originalUrl}</td>
                {/* <td onClick={() => handleUrlChange(hashUrl)}>
                  {shortUrl ? (
                    <a href={shortUrl} target='blank'>
                      {hashUrl}
                    </a>
                  ) : (
                    <a>{hashUrl}</a>
                  )}
                </td>*/}
                <td onClick={() => handleCount(_id, 'inc')}>
                  <a href={`http://localhost:3050/api/url/${hashUrl}`} target='_blank'>
                    {hashUrl}
                  </a>
                </td>
                <td>{count}</td>
                <td>{createdAt}</td>
                <td>
                  <button onClick={() => handleDelete(_id)}>delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
