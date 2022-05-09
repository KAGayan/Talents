using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Talent.Models;

namespace TalentAPI.Controllers
{
    [Route("api/[controller]")]
    public class CurriculumVitaeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        // [ActionName("GetEmployeeByID")]
        [HttpGet("LoadSector")]
        public List<Sector> LoadSector(int id)
        {
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@

            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            sqlCmd.CommandText = "Select * from SECTOR";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            var sector = new List<Sector>();
            while (reader.Read())
            {
                var sectr = new Sector();
                sectr.id = Convert.ToInt32(reader.GetValue(0));
                sectr.title = reader.GetValue(1).ToString();
                sector.Add(sectr);
            }
            myConnection.Close();
            return sector;

        }

        [HttpGet]
        // [ActionName("GetEmployeeByID")]
        [HttpGet("LoadEduLevel")]
        public List<loadEduLevel> LoadEduLevel()
        {
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@

            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            sqlCmd.CommandText = "Select * from EDUCATION_LEVEL";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            var educationLevel = new List<loadEduLevel>();
            while (reader.Read())
            {
                var edulv = new loadEduLevel();
                edulv.id = Convert.ToInt32(reader.GetValue(0));
                edulv.title = reader.GetValue(1).ToString();
                educationLevel.Add(edulv);
            }
            myConnection.Close();
            return educationLevel;

        }

        [HttpGet]
        // [ActionName("GetEmployeeByID")]
        [HttpGet("LoadEduQual")]
        public List<educationQual> LoadEduQual(int sectorId,int eduLvlId)
        {
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@

            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            sqlCmd.CommandText = "Select * from EDUCATION_QUALIFICATION WHERE EDUCATION_ID = "+ eduLvlId + " AND SECTOR_ID = "+ sectorId + " ";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            var educationQual = new List<educationQual>();
            while (reader.Read())
            {
                var edulv = new educationQual();
                edulv.id = Convert.ToInt32(reader.GetValue(0));
                edulv.title = reader.GetValue(3).ToString();
                educationQual.Add(edulv);
            }
            myConnection.Close();
            return educationQual;

        }

        [HttpGet]
        // [ActionName("GetEmployeeByID")]
        [HttpGet("LoadProfQual")]
        public List<professionalQual> LoadProfQual(int sectorId)
        {
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@

            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            sqlCmd.CommandText = "Select * from PROFESSIONAL_QUALIFICATION WHERE SEC_ID = " + sectorId + " ";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            var professionalQual = new List<professionalQual>();
            while (reader.Read())
            {
                var profQuallv = new professionalQual();
                profQuallv.id = Convert.ToInt32(reader.GetValue(0));
                profQuallv.title = reader.GetValue(2).ToString();
                professionalQual.Add(profQuallv);
            }
            myConnection.Close();
            return professionalQual;

        }

        [HttpGet]
        // [ActionName("GetEmployeeByID")]
        [HttpGet("LoadJob")]
        public List<Job> LoadJob(int sectorId)
        {
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@

            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            sqlCmd.CommandText = "Select * from JOB WHERE SEC_ID = " + sectorId + " ";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            var job = new List<Job>();
            while (reader.Read())
            {
                var jobIndi = new Job();
                jobIndi.id = Convert.ToInt32(reader.GetValue(0));
                jobIndi.title = reader.GetValue(2).ToString();
                job.Add(jobIndi);
            }
            myConnection.Close();
            return job;

        }

        [HttpGet]
        // [ActionName("GetEmployeeByID")]
        [HttpGet("LoadSkill")]
        public List<Skill> LoadSkill(int sectorId)
        {
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@

            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            sqlCmd.CommandText = "Select * from SKILL WHERE SEC_ID = " + sectorId + " ";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            var skill = new List<Skill>();
            while (reader.Read())
            {
                var skillIndi = new Skill();
                skillIndi.id = Convert.ToInt32(reader.GetValue(0));
                skillIndi.title = reader.GetValue(2).ToString();
                skill.Add(skillIndi);
            }
            myConnection.Close();
            return skill;

        }

        [HttpPost]
        [ActionName("save")]
        [HttpPost("save")]
        public Talent.Models.TaskStatus save(String username, String password) //([FromBody] dynamic data)
        {
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@
            Talent.Models.TaskStatus Status = new Talent.Models.TaskStatus();

            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            sqlCmd.CommandText = "SELECT * FROM USER_LOGIN WHERE USER_NAME = '" + username + "' AND PASSWORD = '" + password + "' ";
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
                    emp.id = Convert.ToInt32(reader.GetValue(0));
                    emp.UserName = reader.GetValue(1).ToString();
                    emp.Password = reader.GetValue(2).ToString();
                    emp.userype = Convert.ToInt32(reader.GetValue(3));

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
        [ActionName("resume")]
        [HttpPost("resume")]
        public Talent.Models.cv resume(int empId) //([FromBody] dynamic data)
        {
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@
            Talent.Models.TaskStatus Status = new Talent.Models.TaskStatus();
            cv curriculumVitae = new cv();

            String profile = "SELECT * FROM USER_DETAILM WHERE EMP_NUMBER = "+ empId + " ";
            String education = "SELECT *,S.SECTOR_DESCRIPTION FROM EDUCATION_QUALIFICATION A INNER JOIN SECTOR S ON S.SECTOR_ID = A.SECTOR_ID WHERE EDUQUAL_ID IN(SELECT EDUQUAL_ID FROM USER_EDUQUAL WHERE EMP_NUMBER = "+ empId + " )";
            String professional = "SELECT * FROM PROFESSIONAL_QUALIFICATION WHERE PROFQUAL_ID IN ( SELECT PROFQUAL_ID FROM USER_PROFQUAL WHERE EMP_NUMBER = "+ empId + " )";
            String skillquery = "SELECT * FROM SKILL WHERE SKILL_ID IN (SELECT SKILL_ID FROM USER_SKILL WHERE EMP_NUMBER = "+ empId + " )";
            String experiencequery = "SELECT A.*,J.DESCRIPTION AS DESIGNATION FROM MODIFIED_EXPERIENCE A INNER JOIN JOB J ON J.JOB_ID = A.JOB_ID WHERE EMP_NUMBER = "+ empId + " ";


            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
           
            sqlCmd.Connection = myConnection;
            profile emp = null;
            educationQual edu = null;
            professionalQual prof = null;
            Skill skill = null;
            Experience experience = null;
            List<educationQual> listacademic = new List<educationQual>();
            List<professionalQual> listprof = new List<professionalQual>();
            List<Skill> listskill = new List<Skill>();
            List<Experience> listexperience = new List<Experience>();
            try
            {
                myConnection.Open();
                sqlCmd.CommandText = profile;
                reader = sqlCmd.ExecuteReader();
                if (reader.Read())
                {
                    //while (reader.Read())
                    //{
                    emp = new profile();
                    emp.firstname =reader.GetValue(6).ToString();
                    emp.lastName = reader.GetValue(7).ToString();
                    emp.contactNumber = reader.GetValue(4).ToString();
                    emp.address = reader.GetValue(1).ToString();

                    Status.Successfull = 1;
                    Status.Message = "Successful login";
                    // }
                    curriculumVitae.profile = emp;
                    curriculumVitae.gCSEpassess = Convert.ToInt32(reader.GetValue(9));
                }
                else
                {
                    Status.Successfull = 0;
                    Status.Message = "Incorrect Username or Password";
                }
                myConnection.Close();
                myConnection.Open();
                sqlCmd.CommandText = education;
                
                reader = sqlCmd.ExecuteReader();
                //if (reader.Read())
                //{
                Sector tempsector = new Sector();

                while (reader.Read())
                {
                    edu = new educationQual();
                    edu.id = Convert.ToInt32(reader.GetValue(0));
                    edu.title = reader.GetValue(3).ToString();
                    edu.typeId = reader.GetValue(1).ToString();

                    tempsector.id = Convert.ToInt32(reader.GetValue(2));
                    tempsector.title = reader.GetValue(6).ToString();

                    Status.Successfull = 1;
                    Status.Message = "Successful login";
                    listacademic.Add(edu);

                }


                //}
                //else
                //{
                //    Status.Successfull = 0;
                //    Status.Message = "Incorrect Username or Password";
                //}
                curriculumVitae.sector = tempsector;
                curriculumVitae.academicQualification = listacademic;
                myConnection.Close();

                myConnection.Open();
                sqlCmd.CommandText = professional;

                reader = sqlCmd.ExecuteReader();
                
                while (reader.Read())
                {
                    prof = new professionalQual();
                    prof.id = Convert.ToInt32(reader.GetValue(0));
                    prof.title = reader.GetValue(2).ToString();
                    //edu.typeId = reader.GetValue(1).ToString();


                    Status.Successfull = 1;
                    Status.Message = "Successful login";
                    listprof.Add(prof);
                }
                   

             
                curriculumVitae.professionalQualification = listprof;

                myConnection.Close();
                myConnection.Open();
                sqlCmd.CommandText = skillquery;

                reader = sqlCmd.ExecuteReader();

                while (reader.Read())
                {
                    skill = new Skill();
                    skill.id = Convert.ToInt32(reader.GetValue(0));
                    skill.title = reader.GetValue(2).ToString();
                    //edu.typeId = reader.GetValue(1).ToString();


                    Status.Successfull = 1;
                    Status.Message = "Successful login";
                    listskill.Add(skill);
                }

                curriculumVitae.skillsList = listskill;
                myConnection.Close();

                myConnection.Open();
                sqlCmd.CommandText = experiencequery;

                reader = sqlCmd.ExecuteReader();

                while (reader.Read())
                {
                    Job tempJob = new Job();
                    experience = new Experience();
                    experience.id = Convert.ToInt32(reader.GetValue(1));
                    tempJob.id = Convert.ToInt32(reader.GetValue(2));
                    tempJob.title = reader.GetValue(7).ToString();
                    experience.from = Convert.ToInt32(reader.GetValue(3));
                    experience.to = Convert.ToInt32(reader.GetValue(4));
                    experience.description = reader.GetValue(6).ToString();
                    //edu.typeId = reader.GetValue(1).ToString();
                    experience.designation = tempJob;

                    Status.Successfull = 1;
                    Status.Message = "Successful login";
                    listexperience.Add(experience);
                }

                curriculumVitae.experiences = listexperience;
                myConnection.Close();
            }
            catch (Exception ex)
            {
                Status.Successfull = 0;
                Console.Write("Error info:" + ex.Message);
                Console.Write("Error info:" + ex.InnerException); //ex.InnerException.Message
                Status.Message = ex.InnerException.Message.ToString();
            }

            return curriculumVitae;

        }
    }
}
