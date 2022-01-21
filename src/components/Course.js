import {getCourseTerm, getCourseNumber, hasConflict, toggle} from '../utilities/times.js'

const Course = ({course, selected, setSelected}) => {

    const isSelected = selected.includes(course);

    const isDisabled = !isSelected && hasConflict(course, selected);

    const style = {
      backgroundColor: isDisabled ? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
    }
    return(
      <div className="card m-1 p-2"
      style={style}
      onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}>
      <dive className="card-body">
        <div className="card-title">{ getCourseTerm(course)} CS {getCourseNumber(course)}</div>
        <div className="card-text">{ course.title }</div>
        <div className="card-text">{ course.meets}</div>
      </dive>
    </div>
    );
}

export default Course;