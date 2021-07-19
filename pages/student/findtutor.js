import Navbar from "/components/Navbar.js";
import Footer from "/components/Footer";
import withAuth from "/components/auth/withAuth.js";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";

function TuteeApply() {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    let tutorsubject = watch("subject");
    function TutorCourse() {
        console.log(tutorsubject);
        if (tutorsubject == undefined) {
            return null;
        } else {
            let choices = [];
            if (tutorsubject === "English") {
                choices = [
                    "English 9 Honors",
                    "English 9 Academic",
                    "English 10 Honors",
                    "English 10 Academic",
                    "English 11 Honors",
                    "English 11 Academic",
                    "AP English Language & Composition",
                    "English 12 Academic",
                    "English 12 Dual Enrollment",
                    "AP English Literature & Composition",
                    "Creative Writing",
                ];
            } else if (tutorsubject === "Mathematics") {
                choices = ["d", "e", "f"];
            }
            return (
                <label className="label">
                    Course of Tutelage
                    <div className="control">
                        <label className="label"></label>
                        <div className="select">
                            <select
                                {...register("course", {
                                    required: true,
                                })}>
                                <option>Select Course</option>
                                {choices.map((course) => (
                                    <option key={course} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <span className="help">
                            The course the student needs tutoring in. If the
                            course is not listed above, please select "Other"
                            and specify in "Additional Comments" section below.
                        </span>
                        <span className="help is-danger">
                            {errors.subject?.type === "required" &&
                                "A course is required."}
                        </span>
                    </div>
                </label>
            );
        }
    }

    async function onSubmitForm(values) {
        console.log(values);
    }

    return (
        <>
            <Navbar />
            <div className="page-wrapper" id="tutee-apply">
                <div
                    className={
                        "columns tutee-apply-section-wrapper is-vcentered is-multiline"
                    }>
                    <div className="column about-section-text is-full">
                        <div className="about-section-header">
                            Tutee Registration
                        </div>
                        <div className="about-section-body">
                            Students, please complete this form carefully to
                            request a tutor in a particular subject area. Please
                            check your email reguarly for our reply when we find
                            a tutor suitable for your preferences.
                        </div>
                    </div>
                </div>
                <div className={"tutee-apply-section-wrapper"}>
                    <form
                        className="create-opportunity-form"
                        onSubmit={handleSubmit(onSubmitForm)}>
                        <div className="field-title">Tutee Information</div>
                        <hr className="field-title-hr"></hr>
                        <fieldset disabled>
                            <div className="field is-grouped">
                                <label className="label">
                                    First Name
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            value="Johnny"
                                            {...register("first", {
                                                required: true,
                                            })}></input>
                                        <span className="help is-danger">
                                            {errors.first?.type ===
                                                "required" &&
                                                "First name is required."}
                                        </span>
                                    </div>
                                </label>
                                <label className="label">
                                    Last Name
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            value="Appleseed"
                                            {...register("last", {
                                                required: true,
                                            })}></input>
                                        <span className="help is-danger">
                                            {errors.last?.type === "required" &&
                                                "Last name is required."}
                                        </span>
                                    </div>
                                </label>
                            </div>

                            <div className="field is-grouped">
                                <label className="label">
                                    Student LCPS Email
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            value="test@lcps.org"
                                            {...register("email", {
                                                required: true,
                                            })}></input>
                                        <span className="help">
                                            LCPS issued student email (Student
                                            ID +@lcps.org)
                                        </span>
                                        <span className="help is-danger">
                                            {errors.title?.type ===
                                                "required" &&
                                                "Email is required."}
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </fieldset>
                        <div className="field is-grouped">
                            <label className="label">
                                <div className="control">
                                    <label className="label"></label>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        {...register("studentinfo", {
                                            required: true,
                                        })}></input>
                                    {"    "}I am the student displayed above,
                                    and I confirm that the above information
                                    about me is correct.
                                    <span className="help is-danger">
                                        {errors.studentinfo?.type ===
                                            "required" &&
                                            "You are required to verify your student information. If the above is not you or incorrect, please contact us."}
                                    </span>
                                </div>
                            </label>
                        </div>
                        <br></br>
                        <div className="field-title">Parent Information</div>
                        <hr className="field-title-hr"></hr>
                        <div className="field is-grouped">
                            <label className="label">
                                First Name
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Johnny"
                                        {...register("parentfirst", {
                                            required: true,
                                        })}></input>
                                    <span className="help is-danger">
                                        {errors.parentfirst?.type ===
                                            "required" &&
                                            "First name is required."}
                                    </span>
                                </div>
                            </label>
                            <label className="label">
                                Last Name
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Appleseed"
                                        {...register("parentlast", {
                                            required: true,
                                        })}></input>
                                    <span className="help is-danger">
                                        {errors.parentlast?.type ===
                                            "required" &&
                                            "Last name is required."}
                                    </span>
                                </div>
                            </label>
                        </div>
                        <div className="field is-grouped">
                            <label className="label">
                                Parent Email
                                <div className="control">
                                    <label className="label"></label>
                                    <input
                                        className="input"
                                        type="email"
                                        {...register("parentemail", {
                                            required: true,
                                        })}></input>
                                    <span className="help is-danger">
                                        {errors.parentemail?.type ===
                                            "required" &&
                                            "A parent email is required."}
                                    </span>
                                </div>
                            </label>
                        </div>
                        <label className="label">
                            <div className="control">
                                <label className="label"></label>
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    {...register("parentverify", {
                                        required: true,
                                    })}></input>
                                {"    "}I am the student's parental guardian,
                                and I permit my child to participate in the
                                Riverside National Honor Society Tutoring
                                Program.
                                <span className="help is-danger">
                                    {errors.parentverify?.type === "required" &&
                                        "You are required to give permission for your child to participate in the tutoring program."}
                                </span>
                            </div>
                        </label>
                        <br></br>
                        <div className="field-title">School Information</div>
                        <hr className="field-title-hr"></hr>
                        <div className="field">
                            <label className="label">
                                School
                                <div className="control">
                                    <label className="label"></label>

                                    <div className="select">
                                        <select
                                            {...register("school", {
                                                required: true,
                                            })}>
                                            <option>Select School</option>
                                            <option>
                                                Riverside High School
                                            </option>
                                            <option>
                                                Belmont Ridge Middle School
                                            </option>
                                            <option>
                                                Seldens Landing Elementary
                                                School
                                            </option>
                                            {/* <option>
                                                Licoln Elementary School
                                            </option> */}
                                        </select>
                                    </div>
                                    <span className="help">
                                        Tutoring program is currently only
                                        available for schools listed above. If
                                        you are enrolled in any other school
                                        within Loudoun County Public Schools and
                                        would like to participate in the
                                        program, please directly contact us.
                                    </span>
                                    <span className="help is-danger">
                                        {errors.school?.type === "required" &&
                                            "You are required to verify your student information. If the above is not you or incorrect, please contact us."}
                                    </span>
                                </div>
                            </label>
                        </div>
                        <div className="field is-grouped">
                            <label className="label">
                                Grade Level
                                <div className="control">
                                    <label className="label"></label>
                                    <input
                                        className="input"
                                        type="number"
                                        min={1}
                                        max={12}
                                        {...register("grade", {
                                            required: true,
                                        })}></input>
                                    <span className="help is-danger">
                                        {errors.grade?.type === "required" &&
                                            "A grade level is required."}
                                    </span>
                                </div>
                            </label>
                        </div>
                        <div className="field is-grouped">
                            <label className="label">
                                Counselor Email
                                <div className="control">
                                    <label className="label"></label>
                                    <input
                                        className="input"
                                        type="email"
                                        {...register("counseloremail", {
                                            required: true,
                                        })}></input>
                                    <span className="help is-danger">
                                        {errors.counseloremail?.type ===
                                            "required" &&
                                            "A counselor email is required."}
                                    </span>
                                </div>
                            </label>
                        </div>
                        <br></br>
                        <div className="field-title">Tutoring Information</div>
                        <hr className="field-title-hr"></hr>
                        <div className="field is-grouped">
                            <label className="label">
                                Subject of Tutelage
                                <div className="control">
                                    <label className="label"></label>
                                    <div className="select">
                                        <select
                                            {...register("subject", {
                                                required: true,
                                            })}>
                                            <option>Select Subject</option>
                                            <option>English</option>
                                            <option>Mathematics</option>
                                            <option>
                                                Seldens Landing Elementary
                                                School
                                            </option>
                                        </select>
                                    </div>
                                    <span className="help">
                                        The subject the student needs tutoring
                                        in. If the subject is not listed above,
                                        please select "Other" and specify in
                                        "Additional Comments" section below.
                                    </span>
                                    <span className="help is-danger">
                                        {errors.subject?.type === "required" &&
                                            "A subject is required."}
                                    </span>
                                </div>
                            </label>
                            <TutorCourse />
                        </div>
                        <div className="field is-grouped">
                            <label className="label">
                                Teacher First Name
                                <div className="control">
                                    <label className="label"></label>
                                    <input
                                        className="input"
                                        type="text"
                                        {...register("teacherfirst", {
                                            required: true,
                                        })}></input>
                                    <span className="help">
                                        The tutee's teacher of the subject
                                        above.
                                    </span>
                                    <span className="help is-danger">
                                        {errors.teacherfirst?.type ===
                                            "required" &&
                                            "A teacher name is required."}
                                    </span>
                                </div>
                            </label>
                            <label className="label">
                                Teacher Last Name
                                <div className="control">
                                    <label className="label"></label>
                                    <input
                                        className="input"
                                        type="text"
                                        {...register("teacherlast", {
                                            required: true,
                                        })}></input>
                                    <span className="help is-danger">
                                        {errors.teacherlast?.type ===
                                            "required" &&
                                            "A teacher name is required."}
                                    </span>
                                </div>
                            </label>
                        </div>
                        <div className="field is-grouped">
                            <label className="label">
                                Teacher Email
                                <div className="control">
                                    <label className="label"></label>
                                    <input
                                        className="input"
                                        type="email"
                                        {...register("teacheremail", {
                                            required: true,
                                        })}></input>
                                    <span className="help">
                                        The teacher's LCPS issued email. This
                                        can usually be found on the school
                                        website.
                                    </span>
                                    <span className="help is-danger">
                                        {errors.teacheremail?.type ===
                                            "required" &&
                                            "A teacher email is required."}
                                    </span>
                                </div>
                            </label>
                        </div>
                        <br></br>
                        <div className="field-title">Form Submission</div>
                        <hr className="field-title-hr"></hr>
                        <div className="field is-grouped">
                            <div className="control">
                                <input
                                    className="button tutee-submit-button"
                                    type="submit"
                                    name="submit"
                                    value="Submit Registration"></input>
                            </div>
                            <div className="control">
                                <input
                                    className="button tutee-cancel-button"
                                    type="button"
                                    name="cancel"
                                    value="Cancel"
                                    onClick={() => {
                                        router.push("/student");
                                    }}></input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withAuth(TuteeApply, "student");
