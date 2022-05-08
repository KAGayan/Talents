using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Talent.Models;

namespace Talent.Controllers
{
    //[ApiController]
   // [Route("[controller]")]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
       // [ActionName("GetEmployeeByID")]
        [HttpGet("GetEmployeeByID")]
        public UserMain GetUser(int id)
        {
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@

            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            sqlCmd.CommandText = "Select * from USER_LOGIN where EMP_NUMBER=" + id + "";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();
            UserMain emp = null;
            while (reader.Read())
            {
                emp = new UserMain();
                emp.EmployeeNumber = Convert.ToInt32(reader.GetValue(0));
                emp.UserName = reader.GetValue(1).ToString();
                emp.Password = reader.GetValue(2).ToString();
                emp.EmpType = Convert.ToInt32(reader.GetValue(3));
            }
            myConnection.Close();
            return emp;

        }
        [HttpGet]
        // [ActionName("GetEmployeeByID")]
        [HttpGet("GetEmployeeByLoginPassword")]
        public Models.TaskStatus GetUserByNamePass(string UserName,string Password)
        {
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@
            Models.TaskStatus Status = new Models.TaskStatus();

            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            sqlCmd.CommandText =  "SELECT * FROM USER_LOGIN WHERE USER_NAME = '"+ UserName + "' AND PASSWORD = '" + Password + "' ";
            sqlCmd.Connection = myConnection;
            UserMain emp = null;
            try
            {
                myConnection.Open();
                reader = sqlCmd.ExecuteReader();
                if (reader.Read())
                {
                    //while (reader.Read())
                    //{
                    emp = new UserMain();
                    emp.EmployeeNumber = Convert.ToInt32(reader.GetValue(0));
                    emp.UserName = reader.GetValue(1).ToString();
                    emp.Password = reader.GetValue(2).ToString();
                    emp.EmpType = Convert.ToInt32(reader.GetValue(3));

                    Status.Successfull = 1;
                    Status.Message = "Successful login";
                    // }
                    Status.User = emp;
                }
                else
                {
                    Status.Successfull = 0;
                    Status.Message = "Incorrect Username or Password";
                }
                      
                myConnection.Close();
            }
            catch (Exception ex)
            {
                Status.Successfull = 0;
                Console.Write("Error info:" + ex.Message);
                Console.Write("Error info:" + ex.InnerException); //ex.InnerException.Message
                Status.Message = ex.InnerException.Message.ToString();
            }
          
            return Status;

        }
        [HttpPost]
        // [ActionName("GetEmployeeByID")]
        [HttpPost("Register")]
        public Models.TaskStatus AddEmployee(string UserName,string Password,int empType)
        {
            //int maxId = listEmp.Max(e => e.ID);  
            //employee.ID = maxId + 1;  
            //listEmp.Add(employee);  
            Models.TaskStatus Status = new Models.TaskStatus();

            //String Message = 
            if(GetUserByNamePass(UserName, Password).Message == "Successful login")
            {
                Status.Successfull = 0;
                Status.Message = "User Details taken by previous owner";
                return Status;
            }


            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@
            //SqlCommand sqlCmd = new SqlCommand("INSERT INTO tblEmployee (EmployeeId,Name,ManagerId) Values (@EmployeeId,@Name,@ManagerId)", myConnection);  
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            sqlCmd.CommandText = "INSERT INTO USER_LOGIN (USER_NAME,PASSWORD,USER_TYPE) VALUES(@UserName,@Password,@EmpType)";
            sqlCmd.Connection = myConnection;


            sqlCmd.Parameters.AddWithValue("@UserName", UserName);
            sqlCmd.Parameters.AddWithValue("@Password", Password);
            sqlCmd.Parameters.AddWithValue("@EmpType", empType);
            
            try
            {
                myConnection.Open();
                int rowInserted = sqlCmd.ExecuteNonQuery();
                myConnection.Close();

                Status.User = GetUserByNamePass(UserName, Password).User;

                Status.Successfull = 1;
                Status.Message = "User was able to register successfully";

            } 
            catch (Exception ex)
            {
                Status.Successfull = 0;
                Console.Write("Error info:" + ex.Message);
                Console.Write("Error info:" + ex.InnerException); //ex.InnerException.Message
                Status.Message = ex.InnerException.Message.ToString();
            }
            return Status;
           
        }
    }
}
