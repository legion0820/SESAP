using CapstoneController.Data;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace CapstoneController.Models{
    public class Suggestions{
        [Key]
        public int suggestionId {get; set;}

        [Required]
        public string? suggestionTopic {get; set;}

        [Required]
        public string? suggestionText {get; set;}

    }
}