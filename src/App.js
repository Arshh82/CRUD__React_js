import React, { useEffect, useState } from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const App = () => {
  let [data, updatedata] = useState([]);
  let [product, updateproduct] = useState({ name: '', email: '', address: '', password: '' });
  useEffect(() => {
    show();
  });
  async function show() {
    var res = await axios.get("http://tanveerpp.pythonanywhere.com/emps/");
    updatedata(res.data);
  }
  function change(e) {
    updateproduct({ ...product, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className='add' >
        <form onSubmit={(e) => {
          e.preventDefault();
          async function addData() {
            var res = await axios.post('http://tanveerpp.pythonanywhere.com/emps/', product);
            alert("Sucess")
            if (res.status === 200) {
              alert("product added sucessfully");
            }
          }
          addData();
        }}>
          <div className="col-sm-12 offset-sm-1">
            <br />
            Name <br />
            <input type="text" name="name" value={product.name} onChange={change} className='form-control' /><br />

            Email <br />
            <input type="email" name="email" value={product.email} onChange={change} className='form-control' /><br />
            Address<br />
            <input type="text" name="address" value={product.address} onChange={change} className='form-control' /><br />
            Password<br />
            <input type="text" name="password" value={product.password} onChange={change} className='form-control' />
            <button className='btn btn-primary' type='submit' id='subbtn'>Add Product</button>
          </div>
        </form>
      </div>
      <hr />
      <table className='table table-bordered text-center table-hover '>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
            <th>PASSWORD</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => {
            return (<tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{v.address}</td>
              <td>{v.password}</td>
              <td><button className='btn btn-danger' onClick={(e) => {
                e.preventDefault();
                async function dltData() {
                  var res = await axios.delete('http://tanveerpp.pythonanywhere.com/emps/');
                  alert("Sucess")
                }
                dltData();
              }}
              >Delete</button></td>
            </tr>)
          })}
        </tbody>
      </table>

    </>
  )
}
export default App