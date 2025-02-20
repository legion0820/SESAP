using System.ComponentModel.DataAnnotations;
namespace CapstoneController.Models{
    public class Transcripts{
        [Key]
        public int transcriptId {get; set;}

        public int interviewId {get; set;}

        [Required]
        public string? speakerName {get; set;}

        [Required]
        public DateOnly? timestamp {get; set;}

        public string? text {get; set;}
    }
}