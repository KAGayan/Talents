using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Talent.Models
{
    public class TaskStatus
    {
        public int Successfull { get; set; }
        public string Message { get; set; }

        public UserMain User { get; set; }
    }
}
