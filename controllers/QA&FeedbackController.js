// const QuestionModel = require('../models/questions');
// const TFeedbackModel = require('../models/teacherfeedback');
// const SFeedbackModel = require('../models/servicefeedback');

// //-------------Student side question-------------------------------------
// //create question
// const createque = (req, res) => {
//     QuestionModel.create(req.body)
//     .then((data) =>{
//         res.json(data);
//     })
//     .catch((err) =>{
//         res.json(err);
//     })
// }

// //all questions
// const allque = (req, res) => {
//     QuestionModel.find()
//     .then(questions => res.json(questions))
//     .catch(err => res.json(err));
// }

// //get questions to update
// const getupdateque = (req, res) => {
//     const id = req.params.id;
//     QuestionModel.findById({_id:id})
//     .then(questions => res.json(questions))
//     .catch(err => res.json(err));
// }

// //update question
// const updateque = (req, res) => {
//     const id = req.params.id;
//     QuestionModel.findByIdAndUpdate({_id:id},{grade:req.body.grade,subject:req.body.subject,teacher:req.body.teacher,sid:req.body.sid,question:req.body.question})
//     .then(questions => res.json(questions))
//     .catch(err => res.json(err));
// }

// //delete question
// const deleteque = (req, res) => {
//     const id = req.params.id;
//     QuestionModel.findByIdAndDelete({_id:id})
//     .then(questions => res.json(questions))
//     .catch(err => res.json(err));
// }

// //-------------Teacher side question-------------------------------------
// //get not anwered questions 
// const getteacherque = (req, res) => {
//     QuestionModel.find({answer: {$exists: false}}).select('-answer')
//     .then(questions => res.json(questions))
//     .catch(err => res.json(err));
// }

// //give the answer
// const giveans = (req, res) => {
//     const { id } = req.params;
//     QuestionModel.findById(id)
//     .then(questions => res.json(questions))
//     .catch(err => res.json(err));
// }

// //update the answer
// const updateans = (req, res) => {
//     const { id } = req.params;
//     const { answer } = req.body;
//     QuestionModel.findByIdAndUpdate(id, { answer }, { new: true })
//     .then(questions => res.json(questions))
//     .catch(err => res.json(err));
// }

// //show the answer in THQuestion
// const showans = (req, res) => {
//     QuestionModel.find({answer: {$exists: true}}).exec()
//     .then(questions => res.json(questions))
//     .catch(err => res.json(err));
// }

// //get Answer to update
// const getans = (req, res) => {
//     const id  = req.params.id;
//     QuestionModel.findById({_id:id})
//     .then(questions => res.json(questions))
//     .catch(err => res.json(err));
// }

// //update Answer
// const updateanswer = (req, res) => {
//     const id  = req.params.id; 
//     QuestionModel.findByIdAndUpdate({_id:id}, { answer :req.body.answer})
//     .then(questions => res.json(questions))
//     .catch(err => res.json(err));
// }

// // delete answer
// const deleteanswer = (req, res) => {
//     const { id } = req.params;
//     QuestionModel.findByIdAndUpdate(id, { $unset: { answer: 1 } }, { new: true })
//     .then(questions => res.json(questions))
//     .catch(err => res.json(err));
// }

// //faq dispaly
// const displayfaq = (req, res) => {
//     QuestionModel.find({answer: {$exists: true}})
//     .then(allQuestions => {
//     const uniqueQuestions = new Set(); // Set to store unique questions

//     // Filter out repeated questions and questions with empty answers
//     const filteredQuestions = allQuestions.filter(QuestionModel => {
//         if (!uniqueQuestions.has(QuestionModel.question) ) {
//         uniqueQuestions.add(QuestionModel.question);
//         return true; // Include this question
//         }
//         return false; // Skip repeated question or question with empty answer
//     });

//     res.json(filteredQuestions);
//     })
//     .catch(error => {
//     console.error('Error fetching questions:', error);
//     res.status(500).json({ error: 'Internal server error' });
//     });
// }

// //fAQ search option
// const searchfaq = (req, res) => {
//     let { grade, subject } = req.query;
    
//     const query = { answer: { $exists: true } };

//     // Check if grade is provided and convert to case-insensitive regular expression
//     if (grade) {
//         grade = new RegExp(grade, 'i');
//         query.grade = grade;
//     }

//     // Check if subject is provided and convert to case-insensitive regular expression
//     if (subject) {
//         subject = new RegExp(subject, 'i');
//         query.subject = subject;
//     }

//     QuestionModel.find(query)
//       .then(allQuestions => {
//         const uniqueQuestions = new Set(); // Set to store unique questions
  
//         // Filter out repeated questions
//         const filteredQuestions = allQuestions.filter(question => {
//           if (!uniqueQuestions.has(question.question) ) {
//             uniqueQuestions.add(question.question);
//             return true; // Include this question
//           }
//           return false; // Skip repeated question
//         });
  
//         res.json(filteredQuestions);
//       })
//       .catch(error => {
//         console.error('Error fetching questions:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       });
// }

// //----------------------------------------------------------------------------------------------------------
// //create teacher feedback
// const createteacherfeedback = (req, res) => {
//     TFeedbackModel.create(req.body)
//     .then((data) =>{
//         res.json(data);
//     })
//     .catch((err) =>{
//         res.json(err);
//     })
// }

// //create service feedback
// const createservicefeedback = (req, res) => {
//     SFeedbackModel.create(req.body)
//     .then((data) =>{
//         res.json(data);
//     })
//     .catch((err) =>{
//         res.json(err);
//     })
// }

// //get teacher feedbacks
// const getteacherfeedback = (req, res) => {
//     TFeedbackModel.find()
//     .then(tfeedbacks => res.json(tfeedbacks))
//     .catch(err => res.json(err));
// }

// //get service feedbacks
// const getservicefeedback = (req, res) => {
//     SFeedbackModel.find()
//     .then(sfeedbacks => res.json(sfeedbacks))
//     .catch(err => res.json(err));
// }

// //get teacher feedbck to update
// const getteacherfeedbackid = (req, res) => {
//     const id = req.params.id;
//     TFeedbackModel.findById({_id:id})
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// //update teacher feedback
// const updateteacherfeedbackid = (req, res) => {
//     const id = req.params.id;
//     TFeedbackModel.findByIdAndUpdate({_id:id},{grade:req.body.grade,subject:req.body.subject,teacher:req.body.teacher,sid:req.body.sid,feedback:req.body.tfeedback},{ new: true })
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// //delete teacher feedback
// const deleteteacherfeedbackid = (req, res) => {
//     const id = req.params.id;
//     TFeedbackModel.findByIdAndDelete({_id:id})
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// //get service feedback to update
// const getservicefeedbackid = (req, res) => {
//     const id = req.params.id;
//     SFeedbackModel.findById({_id:id})
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// //delete service feedback
// const deleteservicefeedbackid = (req, res) => {
//     const id = req.params.id;
//     SFeedbackModel.findByIdAndDelete({_id:id})
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// //update service feedback
// const updateservicefeedbackid = (req, res) => {
//     const id = req.params.id;
//     SFeedbackModel.findByIdAndUpdate({_id:id},{grade:req.body.grade,feedback:req.body.sfeedbacks,date:req.body.date},{ new: true })
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// //-----------------------------------Manager side feedback(service feedback)------------------------------------
// //get not anwered service feedback 
// const servicefeedbackid = (req, res) => {
//     SFeedbackModel.find({reply: {$exists: false}}).select('-reply')
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// //get not anwered service feedback 
// const giveresponse = (req, res) => {
//     const { id } = req.params;
//     SFeedbackModel.findById(id)
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// //get not anwered service feedback 
// const gettoreply = (req, res) => {
//     const { id } = req.params;
//     const { reply } = req.body;
//     SFeedbackModel.findByIdAndUpdate(id, { reply }, { new: true })
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// //show the reply in ManagerFeedback
// const showfeedback = (req, res) => {
//     SFeedbackModel.find({reply: {$exists: true}}).exec()
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// //get reply to update
// const getreply = (req, res) => {
//     const id  = req.params.id;
//     SFeedbackModel.findById({_id:id})
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// //update reply
// const updatereply = (req, res) => {
//     const id  = req.params.id; 
//     SFeedbackModel.findByIdAndUpdate({_id:id}, { reply :req.body.reply})
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// //delete reply
// const deletereply = (req, res) => {
//     const { id } = req.params;
//     SFeedbackModel.findByIdAndUpdate(id, { $unset: { reply: 1 } }, { new: true })
//     .then(feedbacks => res.json(feedbacks))
//     .catch(err => res.json(err));
// }

// module.exports = {
//     createque,
//     allque,
//     getupdateque,
//     updateque,
//     deleteque,
//     getteacherque,
//     giveans,
//     updateans,
//     showans,
//     getans,
//     updateanswer,
//     deleteanswer,
//     displayfaq,
//     searchfaq,
//     createteacherfeedback,
//     createservicefeedback,
//     getteacherfeedback,
//     getservicefeedback,
//     getteacherfeedbackid,
//     updateteacherfeedbackid,
//     deleteteacherfeedbackid,
//     getservicefeedbackid,
//     deleteservicefeedbackid,
//     updateservicefeedbackid,
//     servicefeedbackid,
//     giveresponse,
//     gettoreply,
//     showfeedback,
//     getreply,
//     updatereply,
//     deletereply
// }




import mongoose from "mongoose";
import { questionModel } from "../models/questions.js";
import { tfeedbackModel } from "../models/teacherfeedback.js";
import { sfeedbackModel } from "../models/servicefeedback.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// =========================================================================
// 1. STUDENT SIDE QUESTIONS METHODS
// =========================================================================

// @desc    Create student question
// @route   POST /api/v1/interactions/questions
const createque = asyncHandler(async (req, res) => {
    const { question, subject, teacher } = req.body;
    if (!question) throw new ApiError(400, "Question body text is required");

    const newQuestion = await QuestionModel.create(req.body);
    return res
        .status(201)
        .json(new ApiResponse(201, newQuestion, "Question submitted successfully"));
});

// @desc    Get all active questions
// @route   GET /api/v1/interactions/questions
const allque = asyncHandler(async (req, res) => {
    const questions = await QuestionModel.find();
    return res
        .status(200)
        .json(new ApiResponse(200, questions, "Questions fetched successfully"));
});

// @desc    Get specific question details by ID
// @route   GET /api/v1/interactions/questions/:id
const getupdateque = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Question ID format");

    const question = await QuestionModel.findById(id);
    if (!question) throw new ApiError(404, "Question entry not found");

    return res
        .status(200)
        .json(new ApiResponse(200, question, "Question record retrieved"));
});

// @desc    Update existing student question profile
// @route   PUT /api/v1/interactions/questions/:id
const updateque = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Question ID format");

    const { grade, subject, teacher, sid, question } = req.body;
    const updated = await QuestionModel.findByIdAndUpdate(
        id,
        { $set: { grade, subject, teacher, sid, question } },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updated, "Question parameters updated"));
});

// @desc    Delete custom question profile
// @route   DELETE /api/v1/interactions/questions/:id
const deleteque = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid Question ID format");

    await QuestionModel.findByIdAndDelete(id);
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Question entry removed successfully"));
});

// =========================================================================
// 2. TEACHER SIDE ANSWER HANDLING METHODS
// =========================================================================

// @desc    Get active questions lacking answers
// @route   GET /api/v1/interactions/teacher/unanswered
const getteacherque = asyncHandler(async (req, res) => {
    const unanswered = await QuestionModel.find({ answer: { $exists: false } }).select("-answer");
    return res
        .status(200)
        .json(new ApiResponse(200, unanswered, "Unanswered questions workspace loaded"));
});

// @desc    Isolate single query row for answer execution
// @route   GET /api/v1/interactions/teacher/answer-row/:id
const giveans = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const question = await QuestionModel.findById(id);
    return res
        .status(200)
        .json(new ApiResponse(200, question, "Target question isolated for answer"));
});

// @desc    Commit or append teacher answer field
// @route   PATCH /api/v1/interactions/teacher/answer/:id
const updateans = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const updated = await QuestionModel.findByIdAndUpdate(id, { $set: { answer } }, { new: true });
    return res
        .status(200)
        .json(new ApiResponse(200, updated, "Teacher answer registered successfully"));
});

// @desc    Display questions containing valid answer rows
// @route   GET /api/v1/interactions/questions/answered
const showans = asyncHandler(async (req, res) => {
    const answered = await QuestionModel.find({ answer: { $exists: true } });
    return res
        .status(200)
        .json(new ApiResponse(200, answered, "Answered database queries cataloged"));
});

// @desc    Get answer block by reference ID
// @route   GET /api/v1/interactions/answer/:id
const getans = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const response = await QuestionModel.findById(id);
    return res
        .status(200)
        .json(new ApiResponse(200, response, "Answer block structural parameters fetched"));
});

// @desc    Modify specific answer parameters
// @route   PUT /api/v1/interactions/answer/:id
const updateanswer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const updated = await QuestionModel.findByIdAndUpdate(id, { $set: { answer: req.body.answer } }, { new: true });
    return res
        .status(200)
        .json(new ApiResponse(200, updated, "Answer string record modified"));
});

// @desc    Unset and clear target answer block data completely
// @route   DELETE /api/v1/interactions/answer/:id
const deleteanswer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const cleared = await QuestionModel.findByIdAndUpdate(id, { $unset: { answer: 1 } }, { new: true });
    return res
        .status(200)
        .json(new ApiResponse(200, cleared, "Answer field wiped out cleanly"));
});

// @desc    Filter out repeated items to populate unique dynamic FAQ arrays
// @route   GET /api/v1/interactions/faq
const displayfaq = asyncHandler(async (req, res) => {
    const allQuestions = await QuestionModel.find({ answer: { $exists: true } });
    const uniqueQuestions = new Set();

    const filteredQuestions = allQuestions.filter(item => {
        if (!uniqueQuestions.has(item.question)) {
            uniqueQuestions.add(item.question);
            return true;
        }
        return false;
    });

    return res
        .status(200)
        .json(new ApiResponse(200, filteredQuestions, "Unique dynamic FAQ array compiled"));
});

// @desc    Case-insensitive parameter queries for filtering FAQ items
// @route   GET /api/v1/interactions/faq/search
const searchfaq = asyncHandler(async (req, res) => {
    let { grade, subject } = req.query;
    const query = { answer: { $exists: true } };

    if (grade) query.grade = new RegExp(grade, "i");
    if (subject) query.subject = new RegExp(subject, "i");

    const allQuestions = await QuestionModel.find(query);
    const uniqueQuestions = new Set();

    const filteredQuestions = allQuestions.filter(question => {
        if (!uniqueQuestions.has(question.question)) {
            uniqueQuestions.add(question.question);
            return true;
        }
        return false;
    });

    return res
        .status(200)
        .json(new ApiResponse(200, filteredQuestions, "Filtered unique FAQ dataset generated"));
});

// =========================================================================
// 3. STUDENT FEEDBACK ARRAYS METHODS (Teacher & Service Profiles)
// =========================================================================

// @desc    Create teacher review row entry
// @route   POST /api/v1/interactions/feedback/teacher
const createteacherfeedback = asyncHandler(async (req, res) => {
    const feedback = await TFeedbackModel.create(req.body);
    return res
        .status(201)
        .json(new ApiResponse(201, feedback, "Teacher performance logging registered"));
});

// @desc    Create structural portal service feedback
// @route   POST /api/v1/interactions/feedback/service
const createservicefeedback = asyncHandler(async (req, res) => {
    const feedback = await SFeedbackModel.create(req.body);
    return res
        .status(201)
        .json(new ApiResponse(201, feedback, "Portal institutional review logged"));
});

// @desc    Fetch complete matrix rows for teacher feedback
// @route   GET /api/v1/interactions/feedback/teacher
const getteacherfeedback = asyncHandler(async (req, res) => {
    const feedback = await TFeedbackModel.find();
    return res
        .status(200)
        .json(new ApiResponse(200, feedback, "Teacher feedback array compiled"));
});

// @desc    Fetch complete matrix rows for system service reviews
// @route   GET /api/v1/interactions/feedback/service
const getservicefeedback = asyncHandler(async (req, res) => {
    const feedback = await SFeedbackModel.find();
    return res
        .status(200)
        .json(new ApiResponse(200, feedback, "System service reports cataloged"));
});

// @desc    Fetch target teacher review record details
// @route   GET /api/v1/interactions/feedback/teacher/:id
const getteacherfeedbackid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const feedback = await TFeedbackModel.findById(id);
    return res
        .status(200)
        .json(new ApiResponse(200, feedback, "Target teacher feedback row fetched"));
});

// @desc    Modify parameters on teacher evaluation rows
// @route   PUT /api/v1/interactions/feedback/teacher/:id
const updateteacherfeedbackid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const { grade, subject, teacher, sid, tfeedback } = req.body;
    const updated = await TFeedbackModel.findByIdAndUpdate(
        id,
        { $set: { grade, subject, teacher, sid, feedback: tfeedback } },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updated, "Teacher feedback configuration modified"));
});

// @desc    Delete target teacher review row profile
// @route   DELETE /api/v1/interactions/feedback/teacher/:id
const deleteteacherfeedbackid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    await TFeedbackModel.findByIdAndDelete(id);
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Teacher evaluation log cleared successfully"));
});

// @desc    Fetch target system service feedback entry
// @route   GET /api/v1/interactions/feedback/service/:id
const getservicefeedbackid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const feedback = await SFeedbackModel.findById(id);
    return res
        .status(200)
        .json(new ApiResponse(200, feedback, "Target service profile entry retrieved"));
});

// @desc    Delete target system review profile row
// @route   DELETE /api/v1/interactions/feedback/service/:id
const deleteservicefeedbackid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    await SFeedbackModel.findByIdAndDelete(id);
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Service dashboard record wiped out"));
});

// @desc    Modify target parameters on user service review entry
// @route   PUT /api/v1/interactions/feedback/service/:id
const updateservicefeedbackid = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const { grade, sfeedbacks, date } = req.body;
    const updated = await SFeedbackModel.findByIdAndUpdate(
        id,
        { $set: { grade, feedback: sfeedbacks, date } },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updated, "System review entry structure updated"));
});

// =========================================================================
// 4. MANAGER SIDE SYSTEM FEEDBACK RESPONSES METHODS
// =========================================================================

// @desc    Get system reviews lacking operational manager response logs
// @route   GET /api/v1/interactions/manager/unanswered
const servicefeedbackid = asyncHandler(async (req, res) => {
    const unansweredFeedbacks = await SFeedbackModel.find({ reply: { $exists: false } }).select("-reply");
    return res
        .status(200)
        .json(new ApiResponse(200, unansweredFeedbacks, "Unanswered operations review queue compiled"));
});

// @desc    Isolate target review row path for administrative reply
// @route   GET /api/v1/interactions/manager/review-row/:id
const giveresponse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const feedback = await SFeedbackModel.findById(id);
    return res
        .status(200)
        .json(new ApiResponse(200, feedback, "Target review profile row isolated for response"));
});

// @desc    Commit administrative reply string field parameters
// @route   PATCH /api/v1/interactions/manager/reply/:id
const gettoreply = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { reply } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const updated = await SFeedbackModel.findByIdAndUpdate(id, { $set: { reply } }, { new: true });
    return res
        .status(200)
        .json(new ApiResponse(200, updated, "Administrative reply string committed successfully"));
});

// @desc    Display system evaluations containing active manager reply rows
// @route   GET /api/v1/interactions/manager/replied
const showfeedback = asyncHandler(async (req, res) => {
    const repliedFeedbacks = await SFeedbackModel.find({ reply: { $exists: true } });
    return res
        .status(200)
        .json(new ApiResponse(200, repliedFeedbacks, "Replied evaluation sets cataloged"));
});

// @desc    Get specific reply content data block reference
// @route   GET /api/v1/interactions/manager/reply/:id
const getreply = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const response = await SFeedbackModel.findById(id);
    return res
        .status(200)
        .json(new ApiResponse(200, response, "Reply content structure isolated successfully"));
});

// @desc    Modify existing operational response string parameters
// @route   PUT /api/v1/interactions/manager/reply/:id
const updatereply = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const updated = await SFeedbackModel.findByIdAndUpdate(id, { $set: { reply: req.body.reply } }, { new: true });
    return res
        .status(200)
        .json(new ApiResponse(200, updated, "Administrative comment modified"));
});

// @desc    Unset and strip manager response field from system evaluation entry
// @route   DELETE /api/v1/interactions/manager/reply/:id
const deletereply = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid ID format");

    const cleared = await SFeedbackModel.findByIdAndUpdate(id, { $unset: { reply: 1 } }, { new: true });
    return res
        .status(200)
        .json(new ApiResponse(200, cleared, "Manager response log parameter string wiped out"));
});

// Standardized exports module mapping setup
export {
    createque,
    allque,
    getupdateque,
    updateque,
    deleteque,
    getteacherque,
    giveans,
    updateans,
    showans,
    getans,
    updateanswer,
    deleteanswer,
    displayfaq,
    searchfaq,
    createteacherfeedback,
    createservicefeedback,
    getteacherfeedback,
    getservicefeedback,
    getteacherfeedbackid,
    updateteacherfeedbackid,
    deleteteacherfeedbackid,
    getservicefeedbackid,
    deleteservicefeedbackid,
    updateservicefeedbackid,
    servicefeedbackid,
    giveresponse,
    gettoreply,
    showfeedback,
    getreply,
    updatereply,
    deletereply
};