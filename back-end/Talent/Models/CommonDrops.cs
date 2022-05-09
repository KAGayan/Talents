using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Talent.Models
{
    public class Sector
    {
        public int id { get; set; }
        public string title { get; set; }
    }

    public class loadEduLevel
    {
        public int id { get; set; }
        public string title { get; set; }
    }

    public class educationQual
    {
        public int id { get; set; }
        public string title { get; set; }
        public string typeId { get; set; }
    }

    public class professionalQual
    {
        public int id { get; set; }
        public string title { get; set; }
    }
    public class Job
    {
        public int id { get; set; }
        public string title { get; set; }
    }

    public class Skill
    {
        public int id { get; set; }
        public string title { get; set; }
    }

    public class Experience
    {
        public int id { get; set; }
        public Job designation { get; set; }
        public int from { get; set; }
        public int  to { get; set; }
        public string description { get; set; }
    }
}
