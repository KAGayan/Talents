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
                sectr.sectorId = Convert.ToInt32(reader.GetValue(0));
                sectr.sectorDes = reader.GetValue(1).ToString();
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
                edulv.eduLvlId = Convert.ToInt32(reader.GetValue(0));
                edulv.eduLvlDescription = reader.GetValue(1).ToString();
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
                edulv.eduQualId = Convert.ToInt32(reader.GetValue(0));
                edulv.eduQualDes = reader.GetValue(3).ToString();
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
                profQuallv.profQualId = Convert.ToInt32(reader.GetValue(0));
                profQuallv.profQualDes = reader.GetValue(2).ToString();
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
                jobIndi.jobId = Convert.ToInt32(reader.GetValue(0));
                jobIndi.jobDes = reader.GetValue(2).ToString();
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
                skillIndi.skillId = Convert.ToInt32(reader.GetValue(0));
                skillIndi.skillDes = reader.GetValue(2).ToString();
                skill.Add(skillIndi);
            }
            myConnection.Close();
            return skill;

        }
    }
}
