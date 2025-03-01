using System.ComponentModel.DataAnnotations;
namespace CapstoneController.Models{
    public class Videos{
        [Key]
        public int videoId {get; set;}

        public int interviewId {get; set;}

        [Required]
        public string? videoName {get; set;}

        [Required]
        public string? filePath {get; set;}
    }
}