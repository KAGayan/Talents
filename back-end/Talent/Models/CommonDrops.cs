using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Talent.Models
{
    public class Sector
    {
        public int sectorId { get; set; }
        public string sectorDes { get; set; }
    }

    public class loadEduLevel
    {
        public int eduLvlId { get; set; }
        public string eduLvlDescription { get; set; }
    }

    public class educationQual
    {
        public int eduQualId { get; set; }
        public string eduQualDes { get; set; }
    }

    public class professionalQual
    {
        public int profQualId { get; set; }
        public string profQualDes { get; set; }
    }
    public class Job
    {
        public int jobId { get; set; }
        public string jobDes { get; set; }
    }

    public class Skill
    {
        public int skillId { get; set; }
        public string skillDes { get; set; }
    }

    public class Experience
    {
        public int experId { get; set; }
        public string skillDes { get; set; }
    }
}
