using CapstoneController.Data;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace CapstoneController.Dtos{
    public class SuggestionDto{

        [Required]
        public string? suggestionTopic {get; set;}

        [Required]
        public string? suggestionText {get; set;}

    }
}