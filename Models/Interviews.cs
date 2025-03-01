using System.ComponentModel.DataAnnotations;
namespace CapstoneController.Models{
    public class Interviews{
        [Key]
        public int interviewId {get; set;}

        [Required]
        public string? intervieweeName {get; set;}

        [Required]
        public string? interviewerName {get; set;}

        [Required]
        public DateOnly? interviewDate {get; set;}
    }
}