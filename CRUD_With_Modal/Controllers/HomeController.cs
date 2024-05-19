using CRUD_With_Modal.Data;
using CRUD_With_Modal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Linq;

namespace CRUD_With_Modal.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _db;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var students = _db.students.ToList();
            return Json(students);
        }

        [HttpGet]
        public IActionResult Get(int id)
        {
            var student = _db.students.Find(id);
            if (student == null)
            {
                return Json(new { success = false, message = "Student not found." });
            }
            return Json(new { success = true, data = student });
        }

        [HttpPost]
        public IActionResult Add([FromBody] Student student)
        {
            if (ModelState.IsValid)
            {
                _db.students.Add(student);
                _db.SaveChanges();
                return Json(new { success = true, message = "Student added successfully." });
            }
            return Json(new { success = false, message = "Validation error." });
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var student = _db.students.Find(id);
            if (student == null)
            {
                return Json(new { success = false, message = "Student not found." });
            }
            return Json(new { success = true, data = student });
        }

        [HttpPost]
        public IActionResult Update([FromBody] Student student)
        {
            if (ModelState.IsValid)
            {
                var existingStudent = _db.students.Find(student.Id);
                if (existingStudent == null)
                {
                    return Json(new { success = false, message = "Student not found." });
                }

                existingStudent.RollNo = student.RollNo;
                existingStudent.Name = student.Name;
                existingStudent.Percentage = student.Percentage;

                _db.SaveChanges();
                return Json(new { success = true, message = "Student updated successfully." });
            }
            return Json(new { success = false, message = "Validation error." });
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            var student = _db.students.Find(id);
            if (student == null)
            {
                return Json(new { success = false, message = "Student not found." });
            }
            _db.students.Remove(student);
            _db.SaveChanges();
            return Json(new { success = true, message = "Student deleted successfully." });
        }
    }
}
