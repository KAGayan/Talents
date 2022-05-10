using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
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
            //sqlCmd.CommandText = "Select * from EDUCATION_QUALIFICATION WHERE EDUCATION_ID = "+ eduLvlId + " AND SECTOR_ID = "+ sectorId + " ";
            sqlCmd.CommandText = "Select * from EDUCATION_QUALIFICATION WHERE SECTOR_ID = " + sectorId + " ";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            var educationQual = new List<educationQual>();
            while (reader.Read())
            {
                var edulv = new educationQual();
                edulv.id = Convert.ToInt32(reader.GetValue(0));
                edulv.title = reader.GetValue(3).ToString(); 
                edulv.typeId = reader.GetValue(1).ToString();
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
        [HttpPost("LoadSkill")]
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
        [ActionName("saved")]
        [HttpPost("saved")]
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


        // [ActionName("resume")]
        // [HttpPost("resume")]
       
       
        //[HttpPost]
        [HttpPost("resume")]
        public cv resume(int empId) //([FromBody] dynamic data) empId  [FromBody] JsonElement body
        {
            // var empId = userId;
            //return listEmp.First(e => e.ID == id);  
          //  string json = System.Text.Json.JsonSerializer.Serialize(body);
          //  var empId = "";
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

               // return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }

            return curriculumVitae;

        }

        [HttpPost]
        [ActionName("save")]
        [HttpPost("save")]
       
        public Talent.Models.cv save(int empId, cv curriculum)//(HttpRequest request) //([FromBody] dynamic data)
        {
            // cv curriculumVitae = resume(1017);curriculumVitae
            // cv curriculumVitae = curriculum;
            cv curriculumVitae = resume(1018);
            
            empId = 1020;

            // var empId = 1888834535;
            //empId = 1018;
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@
            Talent.Models.TaskStatus Status = new Talent.Models.TaskStatus();
            //cv curriculumVitae = new cv();

            String profile = "SELECT * FROM USER_DETAILM WHERE EMP_NUMBER = " + empId + " ";
            String education = "SELECT *,S.SECTOR_DESCRIPTION FROM EDUCATION_QUALIFICATION A INNER JOIN SECTOR S ON S.SECTOR_ID = A.SECTOR_ID WHERE EDUQUAL_ID IN(SELECT EDUQUAL_ID FROM USER_EDUQUAL WHERE EMP_NUMBER = " + empId + " )";
            String professional = "SELECT * FROM PROFESSIONAL_QUALIFICATION WHERE PROFQUAL_ID IN ( SELECT PROFQUAL_ID FROM USER_PROFQUAL WHERE EMP_NUMBER = " + empId + " )";
            String skillquery = "SELECT * FROM SKILL WHERE SKILL_ID IN (SELECT SKILL_ID FROM USER_SKILL WHERE EMP_NUMBER = " + empId + " )";
            String experiencequery = "SELECT A.*,J.DESCRIPTION AS DESIGNATION FROM MODIFIED_EXPERIENCE A INNER JOIN JOB J ON J.JOB_ID = A.JOB_ID WHERE EMP_NUMBER = " + empId + " ";


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

                sqlCmd.CommandText = "INSERT INTO USER_DETAILM (EMP_NUMBER, ADDRESS, CONTACT_NUM, FIRST_NAME, LAST_NAME, MAX_GSCE,SEC_ID) VALUES (@EMP_NUMBER, @ADDRESS, @CONTACT_NUM, @FIRST_NAME, @LAST_NAME, @MAX_GSCE,@SEC_ID)";
                
                sqlCmd.Parameters.AddWithValue("@EMP_NUMBER", empId);
                sqlCmd.Parameters.AddWithValue("@ADDRESS", curriculumVitae.profile.address);
                sqlCmd.Parameters.AddWithValue("@CONTACT_NUM", curriculumVitae.profile.contactNumber); 
                sqlCmd.Parameters.AddWithValue("@FIRST_NAME", curriculumVitae.profile.firstname);
                sqlCmd.Parameters.AddWithValue("@LAST_NAME", curriculumVitae.profile.lastName);
                sqlCmd.Parameters.AddWithValue("@MAX_GSCE", curriculumVitae.gCSEpassess);
                sqlCmd.Parameters.AddWithValue("@SEC_ID", curriculumVitae.sector.id);
                reader = sqlCmd.ExecuteReader();
                //if (reader.Read())
                //{
                //    //while (reader.Read())
                //    //{
                //    emp = new profile();
                //    emp.firstname = reader.GetValue(6).ToString();
                //    emp.lastName = reader.GetValue(7).ToString();
                //    emp.contactNumber = reader.GetValue(4).ToString();
                //    emp.address = reader.GetValue(1).ToString();

                //    Status.Successfull = 1;
                //    Status.Message = "Successful login";
                //    // }
                //    curriculumVitae.profile = emp;
                //    curriculumVitae.gCSEpassess = Convert.ToInt32(reader.GetValue(9));
                //}
                //else
                //{
                //    Status.Successfull = 0;
                //    Status.Message = "Incorrect Username or Password";
                //}
                myConnection.Close();
                for(int i = 0; i < curriculumVitae.academicQualification.Count; i++)
                {
                    myConnection.Open();

                    sqlCmd.CommandText = "INSERT INTO USER_EDUQUAL (EMP_NUMBER,EDUQUAL_ID) VALUES (@EMP_NUMBER,@EDUQUAL_ID)";

                    //sqlCmd.Parameters.AddWithValue("@EMP_NUMBER", empId);
                    sqlCmd.Parameters.AddWithValue("@EDUQUAL_ID", curriculumVitae.academicQualification[i].id);
                 
                    reader = sqlCmd.ExecuteReader();

                    myConnection.Close();
                }

                for (int i = 0; i < curriculumVitae.professionalQualification.Count; i++)
                {
                    myConnection.Open();

                    sqlCmd.CommandText = "INSERT INTO USER_PROFQUAL (EMP_NUMBER,PROFQUAL_ID) VALUES (@EMP_NUMBER,"+ curriculumVitae.professionalQualification[i].id + ")";

                    //sqlCmd.Parameters.AddWithValue("@EMP_NUMBER", empId);
                    //sqlCmd.Parameters.AddWithValue("@PROFQUAL_ID", curriculumVitae.professionalQualification[i].id);

                    reader = sqlCmd.ExecuteReader();

                    myConnection.Close();
                }

                for (int i = 0; i < curriculumVitae.skillsList.Count; i++)
                {
                    myConnection.Open();

                    sqlCmd.CommandText = "INSERT INTO USER_SKILL (EMP_NUMBER,SKILL_ID) VALUES (@EMP_NUMBER,"+ curriculumVitae.skillsList[i].id + ")";

                   // sqlCmd.Parameters.AddWithValue("@EMP_NUMBER", empId);
                    //sqlCmd.Parameters.AddWithValue("@SKILL_ID", curriculumVitae.skillsList[i].id);

                    reader = sqlCmd.ExecuteReader();

                    myConnection.Close();
                }

                for (int i = 0; i < curriculumVitae.experiences.Count; i++)
                {
                    myConnection.Open();
                    int total = curriculumVitae.experiences[i].to - curriculumVitae.experiences[i].from;

                    sqlCmd.CommandText = "INSERT INTO MODIFIED_EXPERIENCE (EMP_NUMBER,EXP_ID,JOB_ID,FROM_YEAR,TO_YEAR,TOTAL_EXP,DESCRIPTION) VALUES (@EMP_NUMBER,"+ curriculumVitae.experiences[i].id + ","+ curriculumVitae.experiences[i].designation.id + ","+ curriculumVitae.experiences[i].from + ","+ curriculumVitae.experiences[i].to + ","+ total + ",'"+ curriculumVitae.experiences[i].description + "')"; 

                   // sqlCmd.Parameters.AddWithValue("@EMP_NUMBER", empId);
                   // sqlCmd.Parameters.AddWithValue("@SKILL_ID", curriculumVitae.experiences[i].id);
                   // sqlCmd.Parameters.AddWithValue("@SKILL_ID", curriculumVitae.experiences[i].designation.id);
                   // sqlCmd.Parameters.AddWithValue("@SKILL_ID", curriculumVitae.experiences[i].from);
                   // sqlCmd.Parameters.AddWithValue("@SKILL_ID", curriculumVitae.experiences[i].to);
                   // sqlCmd.Parameters.AddWithValue("@SKILL_ID", total);
                   // sqlCmd.Parameters.AddWithValue("@SKILL_ID", curriculumVitae.experiences[i].description);

                    reader = sqlCmd.ExecuteReader();

                    myConnection.Close();
                }
                //myConnection.Open();
                //sqlCmd.CommandText = education;

                //reader = sqlCmd.ExecuteReader();
                ////if (reader.Read())
                ////{
                //Sector tempsector = new Sector();

                //while (reader.Read())
                //{
                //    edu = new educationQual();
                //    edu.id = Convert.ToInt32(reader.GetValue(0));
                //    edu.title = reader.GetValue(3).ToString();
                //    edu.typeId = reader.GetValue(1).ToString();

                //    tempsector.id = Convert.ToInt32(reader.GetValue(2));
                //    tempsector.title = reader.GetValue(6).ToString();

                //    Status.Successfull = 1;
                //    Status.Message = "Successful login";
                //    listacademic.Add(edu);

                //}


                //}
                //else
                //{
                //    Status.Successfull = 0;
                //    Status.Message = "Incorrect Username or Password";
                //}
                //curriculumVitae.sector = tempsector;
                //curriculumVitae.academicQualification = listacademic;
                //myConnection.Close();

                //myConnection.Open();
                //sqlCmd.CommandText = professional;

                //reader = sqlCmd.ExecuteReader();

                //while (reader.Read())
                //{
                //    prof = new professionalQual();
                //    prof.id = Convert.ToInt32(reader.GetValue(0));
                //    prof.title = reader.GetValue(2).ToString();
                //    //edu.typeId = reader.GetValue(1).ToString();


                //    Status.Successfull = 1;
                //    Status.Message = "Successful login";
                //    listprof.Add(prof);
                //}
                //curriculumVitae.professionalQualification = listprof;

                //myConnection.Close();
                //myConnection.Open();
                //sqlCmd.CommandText = skillquery;

                //reader = sqlCmd.ExecuteReader();

                //while (reader.Read())
                //{
                //    skill = new Skill();
                //    skill.id = Convert.ToInt32(reader.GetValue(0));
                //    skill.title = reader.GetValue(2).ToString();
                //    //edu.typeId = reader.GetValue(1).ToString();


                //    Status.Successfull = 1;
                //    Status.Message = "Successful login";
                //    listskill.Add(skill);
                //}

                //curriculumVitae.skillsList = listskill;
                //myConnection.Close();

                //myConnection.Open();
                //sqlCmd.CommandText = experiencequery;

                //reader = sqlCmd.ExecuteReader();

                //while (reader.Read())
                //{
                //    Job tempJob = new Job();
                //    experience = new Experience();
                //    experience.id = Convert.ToInt32(reader.GetValue(1));
                //    tempJob.id = Convert.ToInt32(reader.GetValue(2));
                //    tempJob.title = reader.GetValue(7).ToString();
                //    experience.from = Convert.ToInt32(reader.GetValue(3));
                //    experience.to = Convert.ToInt32(reader.GetValue(4));
                //    experience.description = reader.GetValue(6).ToString();
                //    //edu.typeId = reader.GetValue(1).ToString();
                //    experience.designation = tempJob;

                //    Status.Successfull = 1;
                //    Status.Message = "Successful login";
                //    listexperience.Add(experience);
                //}

                //curriculumVitae.experiences = listexperience;
                //myConnection.Close();
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

        [HttpPost]
        [ActionName("update")]
        [HttpPost("update")]
        public Talent.Models.cv update(int empId, cv curriculum)//(HttpRequest request) //([FromBody] dynamic data)
        {
            // cv curriculumVitae = resume(1017);curriculumVitae
            // cv curriculumVitae = curriculum;
            empId = 1020;
            cv curriculumVitae = resume(1014);
            // var empId = 1888834535;
            //empId = 1018;
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@
            Talent.Models.TaskStatus Status = new Talent.Models.TaskStatus();
            //cv curriculumVitae = new cv();

            String profile = "SELECT  FROM USER_DETAILM WHERE EMP_NUMBER = " + empId + " ";
            String education = "SELECT *,S.SECTOR_DESCRIPTION FROM EDUCATION_QUALIFICATION A INNER JOIN SECTOR S ON S.SECTOR_ID = A.SECTOR_ID WHERE EDUQUAL_ID IN(SELECT EDUQUAL_ID FROM USER_EDUQUAL WHERE EMP_NUMBER = " + empId + " )";
            String professional = "SELECT * FROM PROFESSIONAL_QUALIFICATION WHERE PROFQUAL_ID IN ( SELECT PROFQUAL_ID FROM USER_PROFQUAL WHERE EMP_NUMBER = " + empId + " )";
            String skillquery = "SELECT * FROM SKILL WHERE SKILL_ID IN (SELECT SKILL_ID FROM USER_SKILL WHERE EMP_NUMBER = " + empId + " )";
            String experiencequery = "SELECT A.*,J.DESCRIPTION AS DESIGNATION FROM MODIFIED_EXPERIENCE A INNER JOIN JOB J ON J.JOB_ID = A.JOB_ID WHERE EMP_NUMBER = " + empId + " ";


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
                sqlCmd.CommandText = "DELETE  FROM USER_DETAILM WHERE EMP_NUMBER = "+ empId + " ";
                sqlCmd.ExecuteNonQuery();
                myConnection.Close();

                myConnection.Open();

                sqlCmd.CommandText = "INSERT INTO USER_DETAILM (EMP_NUMBER, ADDRESS, CONTACT_NUM, FIRST_NAME, LAST_NAME, MAX_GSCE,SEC_ID) VALUES (@EMP_NUMBER, @ADDRESS, @CONTACT_NUM, @FIRST_NAME, @LAST_NAME, @MAX_GSCE,@SEC_ID)";

                sqlCmd.Parameters.AddWithValue("@EMP_NUMBER", empId);
                sqlCmd.Parameters.AddWithValue("@ADDRESS", curriculumVitae.profile.address);
                sqlCmd.Parameters.AddWithValue("@CONTACT_NUM", curriculumVitae.profile.contactNumber);
                sqlCmd.Parameters.AddWithValue("@FIRST_NAME", curriculumVitae.profile.firstname);
                sqlCmd.Parameters.AddWithValue("@LAST_NAME", curriculumVitae.profile.lastName);
                sqlCmd.Parameters.AddWithValue("@MAX_GSCE", curriculumVitae.gCSEpassess);
                sqlCmd.Parameters.AddWithValue("@SEC_ID", curriculumVitae.sector.id);
                reader = sqlCmd.ExecuteReader();
                //if (reader.Read())
                //{
                //    //while (reader.Read())
                //    //{
                //    emp = new profile();
                //    emp.firstname = reader.GetValue(6).ToString();
                //    emp.lastName = reader.GetValue(7).ToString();
                //    emp.contactNumber = reader.GetValue(4).ToString();
                //    emp.address = reader.GetValue(1).ToString();

                //    Status.Successfull = 1;
                //    Status.Message = "Successful login";
                //    // }
                //    curriculumVitae.profile = emp;
                //    curriculumVitae.gCSEpassess = Convert.ToInt32(reader.GetValue(9));
                //}
                //else
                //{
                //    Status.Successfull = 0;
                //    Status.Message = "Incorrect Username or Password";
                //}
                myConnection.Close();

                myConnection.Open();
                sqlCmd.CommandText = "DELETE  FROM USER_EDUQUAL WHERE EMP_NUMBER = " + empId + " ";
                sqlCmd.ExecuteNonQuery();
                myConnection.Close();

                for (int i = 0; i < curriculumVitae.academicQualification.Count; i++)
                {
                    myConnection.Open();

                    sqlCmd.CommandText = "INSERT INTO USER_EDUQUAL (EMP_NUMBER,EDUQUAL_ID) VALUES (@EMP_NUMBER,@EDUQUAL_ID)";

                    //sqlCmd.Parameters.AddWithValue("@EMP_NUMBER", empId);
                    sqlCmd.Parameters.AddWithValue("@EDUQUAL_ID", curriculumVitae.academicQualification[i].id);

                    reader = sqlCmd.ExecuteReader();

                    myConnection.Close();
                }

                myConnection.Open();
                sqlCmd.CommandText = "DELETE  FROM USER_PROFQUAL WHERE EMP_NUMBER = " + empId + " ";
                sqlCmd.ExecuteNonQuery();
                myConnection.Close();

                for (int i = 0; i < curriculumVitae.professionalQualification.Count; i++)
                {
                    myConnection.Open();

                    sqlCmd.CommandText = "INSERT INTO USER_PROFQUAL (EMP_NUMBER,PROFQUAL_ID) VALUES (@EMP_NUMBER," + curriculumVitae.professionalQualification[i].id + ")";

                    //sqlCmd.Parameters.AddWithValue("@EMP_NUMBER", empId);
                    //sqlCmd.Parameters.AddWithValue("@PROFQUAL_ID", curriculumVitae.professionalQualification[i].id);

                    reader = sqlCmd.ExecuteReader();

                    myConnection.Close();
                }

                myConnection.Open();
                sqlCmd.CommandText = "DELETE  FROM USER_SKILL WHERE EMP_NUMBER = " + empId + " ";
                sqlCmd.ExecuteNonQuery();
                myConnection.Close();

                for (int i = 0; i < curriculumVitae.skillsList.Count; i++)
                {
                    myConnection.Open();

                    sqlCmd.CommandText = "INSERT INTO USER_SKILL (EMP_NUMBER,SKILL_ID) VALUES (@EMP_NUMBER," + curriculumVitae.skillsList[i].id + ")";

                    // sqlCmd.Parameters.AddWithValue("@EMP_NUMBER", empId);
                    //sqlCmd.Parameters.AddWithValue("@SKILL_ID", curriculumVitae.skillsList[i].id);

                    reader = sqlCmd.ExecuteReader();

                    myConnection.Close();
                }

                myConnection.Open();
                sqlCmd.CommandText = "DELETE  FROM MODIFIED_EXPERIENCE WHERE EMP_NUMBER = " + empId + " ";
                sqlCmd.ExecuteNonQuery();
                myConnection.Close();
                for (int i = 0; i < curriculumVitae.experiences.Count; i++)
                {
                    myConnection.Open();
                    int total = curriculumVitae.experiences[i].to - curriculumVitae.experiences[i].from;

                    sqlCmd.CommandText = "INSERT INTO MODIFIED_EXPERIENCE (EMP_NUMBER,EXP_ID,JOB_ID,FROM_YEAR,TO_YEAR,TOTAL_EXP,DESCRIPTION) VALUES (@EMP_NUMBER," + curriculumVitae.experiences[i].id + "," + curriculumVitae.experiences[i].designation.id + "," + curriculumVitae.experiences[i].from + "," + curriculumVitae.experiences[i].to + "," + total + ",'" + curriculumVitae.experiences[i].description + "')";

                    // sqlCmd.Parameters.AddWithValue("@EMP_NUMBER", empId);
                    // sqlCmd.Parameters.AddWithValue("@SKILL_ID", curriculumVitae.experiences[i].id);
                    // sqlCmd.Parameters.AddWithValue("@SKILL_ID", curriculumVitae.experiences[i].designation.id);
                    // sqlCmd.Parameters.AddWithValue("@SKILL_ID", curriculumVitae.experiences[i].from);
                    // sqlCmd.Parameters.AddWithValue("@SKILL_ID", curriculumVitae.experiences[i].to);
                    // sqlCmd.Parameters.AddWithValue("@SKILL_ID", total);
                    // sqlCmd.Parameters.AddWithValue("@SKILL_ID", curriculumVitae.experiences[i].description);

                    reader = sqlCmd.ExecuteReader();

                    myConnection.Close();
                }
          
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
        [HttpGet]
        // [ActionName("GetEmployeeByID")]
        [HttpGet("filter")]
        public List<cv> filter(int jobId=0, int secId=0, int eduLevelId=0, int gcsePasses= -1, int eduQualId=0, int professionalQualId=0, int skillId=0, int experienceId=0)
        {
            //return listEmp.First(e => e.ID == id);  
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = @"Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@";//"Server=.\SQLSERVER2008R2;Database=DBCompany;User ID=sa;Password=xyz@1234;"; //Data Source = localhost; Initial Catalog = QAPRACTISE; User ID = sa; Password = SQL2014@@@

            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            String baseQuery = "SELECT DISTINCT D.EMP_NUMBER FROM USER_DETAILM D "+
            "INNER JOIN  USER_EDUQUAL EQ ON EQ.EMP_NUMBER = D.EMP_NUMBER " +
            "INNER JOIN  USER_PROFQUAL PQ ON PQ.EMP_NUMBER = D.EMP_NUMBER "+
            "INNER JOIN  USER_SKILL SK ON SK.EMP_NUMBER = D.EMP_NUMBER "+
            "INNER JOIN  MODIFIED_EXPERIENCE JB ON JB.EMP_NUMBER = D.EMP_NUMBER "+
            "WHERE ";
            String filterQuery = "";
            if (gcsePasses != -1)
            {
                filterQuery = filterQuery + " D.MAX_GSCE > " + gcsePasses + " ";
            }
            if (secId != 0)
            {
                if( filterQuery != "" )
                {
                    filterQuery = filterQuery + "AND";
                }
                    filterQuery = filterQuery + " SEC_ID = " + secId + " ";

            }
            if (eduQualId != 0)
            {
                if (filterQuery != "")
                {
                    filterQuery = filterQuery + "AND";
                }
                filterQuery = filterQuery + " EDUQUAL_ID = " + eduQualId + " ";
            }
            if (professionalQualId != 0)
            {
                if (filterQuery != "")
                {
                    filterQuery = filterQuery + "AND";
                }
                filterQuery = filterQuery + " PROFQUAL_ID = " + professionalQualId + " ";
            }
            if (skillId != 0)
            {
                if (filterQuery != "")
                {
                    filterQuery = filterQuery + "AND";
                }
                filterQuery = filterQuery + " SK.SKILL_ID = " + skillId + " ";
            }
            if (jobId != 0)
            {
                if (filterQuery != "")
                {
                    filterQuery = filterQuery + "AND";
                }
                filterQuery = filterQuery + " JB.JOB_ID = " + jobId + " ";
            }
            if (eduLevelId != 0)
            {
                if (filterQuery != "")
                {
                    filterQuery = filterQuery + "AND";
                }
                filterQuery = filterQuery + " D.MAXIMUM_EDUCATION >= " + eduLevelId + " ";
            }
            if (experienceId != 0)
            {
                if (filterQuery != "")
                {
                    filterQuery = filterQuery + "AND";
                }
                filterQuery = filterQuery + " JB.TOTAL_EXP >= " + experienceId + " ";
            }
            sqlCmd.CommandText = baseQuery + filterQuery;
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            var job = new List<int>();
            while (reader.Read())
            {
                job.Add(Convert.ToInt32(reader.GetValue(0)));
            }
            List<cv> cvList = new List<cv>();
            myConnection.Close();
            for(int i=0; i< job.Count; i++)
            {
                cvList.Add(resume(job[i]));
            }
            return cvList;

        }
    }
}
 