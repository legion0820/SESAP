using System.ComponentModel.DataAnnotations;
namespace CapstoneController.Dtos{
    public class InterviewDto{

        [Required]
        public string? intervieweeName {get; set;}

        [Required]
        public string? interviewerName {get; set;}

        [Required]
        public DateOnly? interviewDate {get; set;}
    }
}