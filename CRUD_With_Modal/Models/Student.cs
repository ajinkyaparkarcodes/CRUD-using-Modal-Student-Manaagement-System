using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CRUD_With_Modal.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Roll No is required")]
        [DisplayName("Roll No")]
        public int RollNo { get; set; }
        [Required(ErrorMessage = "Name is required")]
        [DisplayName("Student Name")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Percentage No is required")]
        [DisplayName("Percentage")]
        public decimal Percentage { get; set; }

    }
}
