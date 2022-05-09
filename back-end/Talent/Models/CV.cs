using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Talent.Models
{
    public class profile
    {
        public string firstname { get; set; }
        public string lastName { get; set; }
        public string contactNumber { get; set; }
        public string address { get; set; }
    }

    public class cv
    {
        public profile profile { get; set; }
        public int gCSEpassess { get; set; }
        public Sector sector { get; set; }
        public List<Skill> skillsList { get; set; }
        public List<Experience> experiences { get; set; }

        public List<educationQual> academicQualification { get; set; }

        public List<professionalQual> professionalQualification { get; set; }
    }
}
