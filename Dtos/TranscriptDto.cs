using System.ComponentModel.DataAnnotations;
namespace CapstoneController.Dtos{
    public class TranscriptDto{

        [Required]
        public string? speakerName {get; set;}

        [Required]
        public DateOnly? timestamp {get; set;}

        public string? text {get; set;}
    }
}